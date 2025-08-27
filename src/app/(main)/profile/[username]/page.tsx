"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import accountService, { Account } from "@/services/accountService"
import useStatusStore from "@/store/useStatusStore"
import Image from "next/image"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "sonner"

const ProfilePage = () => {
  const { username } = useParams<{ username: string }>()
  const [account, setAccount] = useState<Account | null>(null)
  const { setLoading, setError } = useStatusStore()
  const [isMyProfile, setIsMyProfile] = useState(false)

  useEffect(() => {
    if (!username) return
    accountService.getAccountByUsername({ username })
      .then(res => {
        setAccount(res.data)
        if (localStorage.getItem("userId") === res.data?.id) {
          setIsMyProfile(true)
        }
      })
      .catch(err => {
        toast.error("Failed to load user profile")
        setError("Failed to load user profile")
      })
      .finally(() => { setLoading(false) })
  }, [username])

  if (isMyProfile) {
    localStorage.setItem("username", account?.username || "")
  }

  return (
    <div className="w-full p-4 flex flex-col gap-4 items-center">
      <div className="w-full flex flex-col gap-4 justify-center relative max-h-64">
        <div className="size-full overflow-hidden rounded-2xl">
          <Image src="/images/default-banner.png" alt="Profile Banner" width={1920} height={1080} />
        </div>
        <div className="absolute bottom-0 left-0 w-full flex justify-center translate-y-1/2">
          <Avatar className="size-32 border-6 dark:border-zinc-950 border-white">
            <AvatarImage src="/images/default-profile.png" alt="Profile Picture" width={720} height={720} />
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
          <span className="text-2xl font-semibold">150</span>
          <span className="dark:text-zinc-400 text-zinc-600">Posts</span>
        </div>
        <div className="w-full rounded-md flex flex-col items-center justify-center">
          <span className="text-2xl font-semibold">300</span>
          <span className="dark:text-zinc-400 text-zinc-600">Followers</span>
        </div>
        <div className="w-full rounded-md flex flex-col items-center justify-center">
          <span className="text-2xl font-semibold">200</span>
          <span className="dark:text-zinc-400 text-zinc-600">Following</span>
        </div>
      </div>
      <div className="w-full grid grid-cols-2 md:w-11/12 gap-4 md:gap-6 px-3">
        {
          isMyProfile ? (
            <Button variant="outline" className="w-full md:w-auto col-span-2">Edit Profile</Button>
          ) : (
            <>
              <Button variant="default" className="w-full md:w-auto">Follow</Button>
              <Button variant="outline" className="w-full md:w-auto">Message</Button>
            </>
          )
        }
      </div>
      <Separator />
      <div>
        <h2 className="text-center text-muted-foreground">User hasn't posted anything yet</h2>
      </div>
    </div>
  )
}

export default ProfilePage