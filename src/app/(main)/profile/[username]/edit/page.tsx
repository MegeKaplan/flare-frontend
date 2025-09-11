"use client"
import { useState, useEffect, ChangeEvent, useRef, use } from "react";
import { useParams, useRouter } from "next/navigation";
import accountService from "@/services/accountService";
import mediaService from "@/services/mediaService";
import useStatusStore from "@/store/useStatusStore";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { getComposedAccount } from "@/composers/account";
import { ComposedAccount } from "@/types/account";

const EditProfilePage = () => {
  const { username } = useParams<{ username: string }>();
  const router = useRouter();
  const { setLoading, setError } = useStatusStore();
  const [account, setAccount] = useState<ComposedAccount | null>(null);
  const [data, setData] = useState({
    username: username,
    displayName: "",
    bio: "",
    images: {
      profile: { url: "/images/default-profile.png", file: null as File | null },
      banner: { url: "/images/default-banner.png", file: null as File | null },
    },
  });
  const [isMyProfile, setIsMyProfile] = useState(false);
  const profileInputRef = useRef<HTMLInputElement>(null);
  const bannerInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!username) return;
    setLoading(true);

    const fetchAccount = async () => {
      try {
        const composedAccount = await getComposedAccount(username);
        setAccount(composedAccount);
        setIsMyProfile(localStorage.getItem("userId") === composedAccount.id);

        setData(prev => ({
          ...prev,
          username: composedAccount?.username || prev.username,
          displayName: composedAccount.displayName || "",
          bio: composedAccount.bio || "",
          images: {
            profile: { url: composedAccount.profileImageUrl || prev.images.profile.url, file: null },
            banner: { url: composedAccount.bannerImageUrl || prev.images.banner.url, file: null },
          },
        }));
      } catch {
        toast.error("Failed to load profile");
        setError("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchAccount();
  }, [username]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>, type: "profile" | "banner") => {
    const file = e.target.files?.[0];
    if (!file) return;
    setData(prev => ({
      ...prev,
      images: {
        ...prev.images,
        [type]: { url: URL.createObjectURL(file), file },
      },
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!account) return;
    setLoading(true);
    try {
      let profileImageId = account.profileImageId;
      let bannerImageId = account.bannerImageId;

      for (const type of ["profile", "banner"] as const) {
        const file = data.images[type].file;
        if (file) {
          const formData = new FormData();
          formData.append("files", file);
          const res = await mediaService.uploadMedia(formData);
          if (type === "profile") profileImageId = res.data[0]._id;
          else if (type === "banner") bannerImageId = res.data[0]._id;
        }
      }

      await accountService.updateAccount(account.id, {
        // username: data.username, // username change is not allowed for now
        displayName: data.displayName,
        bio: data.bio,
        profileImageId,
        bannerImageId,
      });

      toast.success("Profile updated successfully!");
      router.push(`/profile/${username}`);
    } catch {
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isMyProfile && account) {
      router.push(`/profile/${username}`);
      toast.error("You can only edit your own profile");
    }
  }, [isMyProfile, account]);

  return (
    <div className="w-full p-4 flex flex-col gap-4 items-center">
      <div className="w-full flex flex-col gap-4 justify-center relative max-h-64">
        <div
          className="h-48 md:h-60 lg:h-80 xl:h-96 overflow-hidden rounded-2xl relative cursor-pointer"
          onClick={() => bannerInputRef.current?.click()}
        >
          <Image src={data.images.banner.url} alt="Profile Banner" fill className="object-cover pointer-events-none" />
        </div>
        <div className="absolute bottom-0 left-0 w-full flex justify-center translate-y-1/2">
          <div
            className="relative cursor-pointer"
            onClick={() => profileInputRef.current?.click()}
          >
            <Avatar className="size-32 border-6 dark:border-zinc-950 border-white">
              <AvatarImage
                src={data.images.profile.url}
                alt="Profile Picture"
                width={720}
                height={720}
              />
              <AvatarFallback className="text-4xl">{account?.username?.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
          </div>
        </div>
        <input
          type="file"
          ref={profileInputRef}
          accept="image/*"
          className="hidden absolute"
          onChange={e => handleFileChange(e, "profile")}
        />
        <input
          type="file"
          ref={bannerInputRef}
          accept="image/*"
          className="hidden absolute"
          onChange={e => handleFileChange(e, "banner")}
        />
      </div>

      <form className="w-full mt-20 flex flex-col items-center text-center gap-4" onSubmit={handleSubmit}>
        <div className="grid gap-3 w-full" onClick={() => toast.info("Username change is not allowed for now")}>
          <Label htmlFor="username" className="font-semibold text-muted-foreground">Username</Label>
          <Input
            id="username"
            name="username"
            type="text"
            value={data.username}
            onChange={handleChange}
            disabled
          />
        </div>
        <div className="grid gap-3 w-full">
          <Label htmlFor="displayName" className="font-semibold">Display Name</Label>
          <Input
            id="displayName"
            name="displayName"
            type="text"
            value={data.displayName}
            onChange={handleChange}
          />
        </div>
        <div className="grid gap-3 w-full">
          <Label htmlFor="bio" className="font-semibold">Bio</Label>
          <Textarea
            id="bio"
            name="bio"
            value={data.bio}
            onChange={handleChange}
            rows={4}
            className="w-full"
          />
        </div>

        <Button className="w-full mt-4">Save Changes</Button>
      </form>
    </div>
  );
};

export default EditProfilePage;
