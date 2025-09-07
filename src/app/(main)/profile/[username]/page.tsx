"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import OptimisticToggle from "@/components/ui/OptimisticToggle"
import { Separator } from "@/components/ui/separator"
import { getComposedAccount } from "@/composers/account"
import { getComposedPost } from "@/composers/content"
import { Icons } from "@/lib/icons"
import contentService from "@/services/contentService"
import { graphService } from "@/services/graphService"
import useStatusStore from "@/store/useStatusStore"
import { ComposedAccount } from "@/types/account"
import { ComposedPost } from "@/types/content"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs"
import Image from "next/image"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "sonner"

const ProfilePage = () => {
  const { username } = useParams<{ username: string }>()
  const [account, setAccount] = useState<ComposedAccount | null>(null)
  const { setLoading, setError } = useStatusStore()
  const [isMyProfile, setIsMyProfile] = useState(false)
  const [profileImages, setProfileImages] = useState<Record<string, string>>({
    profileImageUrl: "/images/default-profile.png",
    bannerImageUrl: "/images/default-banner.png",
  })
  const [posts, setPosts] = useState<ComposedPost[]>([])
  const [myUserId, setMyUserId] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    setMyUserId(localStorage.getItem("userId"))
    if (myUserId === account?.id) {
      setIsMyProfile(true);
      localStorage.setItem("username", account?.username || "")
    }
  }, [account?.id, myUserId])

  useEffect(() => {
    if (!username) return;

    const fetchAccount = async () => {
      try {
        setLoading(true);
        const composedAccount = await getComposedAccount(username);
        setAccount(composedAccount);
        setProfileImages({
          profileImageUrl: composedAccount.profileImageUrl || profileImages.profileImageUrl,
          bannerImageUrl: composedAccount.bannerImageUrl || profileImages.bannerImageUrl,
        });
      } catch (err) {
        toast.error("Failed to load user profile");
        setError("Failed to load user profile");
      } finally {
        setLoading(false);
      }
    };

    fetchAccount();
  }, [username]);

  useEffect(() => {
    if (!account?.id) return

    const fetchPosts = async () => {
      try {
        setLoading(true)
        const { data: rawPosts } = await contentService.getPostsByCreator(account.id)
        const composedPosts: ComposedPost[] = await Promise.all(
          rawPosts.map(post => getComposedPost(post.id!))
        )
        setPosts(composedPosts)
      } catch {
        toast.error("Failed to load posts")
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [account?.id])

  return (
    <div className="w-full p-4 flex flex-col gap-4 items-center">
      <div className="w-full flex flex-col gap-4 justify-center relative max-h-64">
        <div className="size-full overflow-hidden rounded-2xl">
          <Image src={profileImages.bannerImageUrl} alt="Profile Banner" width={1920} height={1080} />
        </div>
        <div className="absolute bottom-0 left-0 w-full flex justify-center translate-y-1/2">
          <Avatar className="size-32 border-6 dark:border-zinc-950 border-white">
            <AvatarImage src={profileImages.profileImageUrl} alt="Profile Picture" width={720} height={720} />
            <AvatarFallback className="text-4xl">{account?.username?.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
        </div>
      </div>
      <div className="w-full mt-12 flex flex-col items-center text-center gap-2">
        {
          account?.displayName ? (
            <div className="flex flex-row items-center gap-1">
              <h1 className="text-2xl font-bold">{account.displayName}</h1>
              <span className="text-xl font-bold text-muted-foreground mt-1">{`(@${account?.username})`}</span>
            </div>
          ) : (
            <h1 className="text-2xl font-bold">{account?.username}</h1>
          )}
        {
          account?.bio && (
            <p className="text-sm dark:text-zinc-400 text-zinc-600">
              {account.bio}
            </p>
          )}
      </div>
      <div className="grid grid-cols-3 gap-4 w-full md:w-10/12">
        <div className="w-full rounded-md flex flex-col items-center justify-center">
          <span className="text-2xl font-semibold">{posts.length}</span>
          <span className="dark:text-zinc-400 text-zinc-600">Posts</span>
        </div>
        <div className="w-full rounded-md flex flex-col items-center justify-center">
          <span className="text-2xl font-semibold">{account?.followers?.length || 0}</span>
          <span className="dark:text-zinc-400 text-zinc-600">Followers</span>
        </div>
        <div className="w-full rounded-md flex flex-col items-center justify-center">
          <span className="text-2xl font-semibold">{account?.following?.length || 0}</span>
          <span className="dark:text-zinc-400 text-zinc-600">Following</span>
        </div>
      </div>
      <div className="w-full grid grid-cols-2 md:w-11/12 gap-4 md:gap-6 px-3">
        {
          isMyProfile ? (
            <Link href={`/profile/${account?.username}/edit`} className="w-full md:w-auto col-span-2">
              <Button variant="outline" className="w-full">
                Edit Profile
              </Button>
            </Link>
          ) : (
            account && <>
              <OptimisticToggle
                initialState={account?.followers?.includes(myUserId!) || false}
                action={async () => {
                  if (!myUserId) return toast.error("You must be logged in to follow users.")
                  setAccount(prev => prev ? { ...prev, followers: [...prev.followers!, myUserId!] } : prev);
                  await graphService.followUser(myUserId!, account.id);
                }}
                undoAction={async () => {
                  if (!myUserId) return
                  setAccount(prev => prev ? { ...prev, followers: prev.followers!.filter(f => f !== myUserId!) } : prev);
                  await graphService.unfollowUser(myUserId!, account.id);
                }}
                className="w-full md:w-auto"
              >
                {(active, loading) => (
                  <Button variant={myUserId && active ? "outline" : "default"} className="w-full" disabled={loading}>
                    {loading ? <><Icons.loader className="animate-spin" /><span>Please wait</span></> : myUserId && active ? "Following" : "Follow"}
                  </Button>
                )}
              </OptimisticToggle>
              <Button variant="outline" className="w-full md:w-auto" onClick={() => router.push(`/messages`)}>Message</Button>
            </>
          )
        }
      </div>
      <Separator />
      <div className="w-full">
        {posts.length === 0 ? (
          <h2 className="text-center text-muted-foreground">User hasn't posted anything yet</h2>
        ) : (
          <Tabs defaultValue="image" className="w-full">
            <TabsList className="w-full grid grid-cols-2 mb-4">
              <TabsTrigger value="image" className="p-4 border-b-2 border-b-transparent data-[state=active]:border-b-primary">
                Image
              </TabsTrigger>
              <TabsTrigger value="text" className="p-4 border-b-2 border-b-transparent data-[state=active]:border-b-primary">
                Text
              </TabsTrigger>
            </TabsList>
            <TabsContent value="image">
              <div className="w-full grid grid-cols-3 gap-3">
                {posts.filter(post => post.mediaUrls && post.mediaUrls.length > 0).map(post => (
                  <Link href={`/post/${post.id}`} key={post.id} className="border rounded-lg w-full flex items-center justify-center relative aspect-square hover:scale-95 transition">
                    <Image src={post.mediaUrls![0]} alt={post?.content || ""} className="w-full h-auto rounded-lg object-cover" fill />
                  </Link>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="text">
              <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                {posts.filter(post => !post.mediaUrls || post.mediaUrls.length === 0).map(post => (
                  <Link
                    key={post.id}
                    href={`/post/${post.id}`}
                    className="w-full p-4 border rounded-lg shadow hover:shadow-md md:hover:scale-95 transition bg-zinc-100 dark:bg-zinc-900 hover:dark:bg-zinc-800/90 hover:bg-zinc-200"
                  >
                    <h3 className="font-semibold lg:text-lg line-clamp-3">{post.content}</h3>
                  </Link>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div >
  )
}

export default ProfilePage