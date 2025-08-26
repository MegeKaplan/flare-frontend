"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"

const ProfilePage = () => {
  return (
    <div className="w-full p-4 flex flex-col gap-4 items-center">
      <div className="w-full flex flex-col gap-4 justify-center relative max-h-64">
        <div className="size-full overflow-hidden rounded-2xl">
          <Image src="/images/default-banner.png" alt="Profile Banner" width={1920} height={1080} />
        </div>
        <div className="absolute bottom-0 left-0 w-full flex justify-center translate-y-1/2">
          <Avatar className="size-32 border-6 dark:border-zinc-950 border-white">
            <AvatarImage src="/images/default-profile.png" alt="Profile Picture" width={720} height={720} />
            <AvatarFallback className="text-4xl">AF</AvatarFallback>
          </Avatar>
        </div>
      </div>
      <div className="w-full mt-12 flex flex-col items-center text-center gap-2">
        <h1 className="text-2xl font-semibold">Username</h1>
        <p className="text-sm dark:text-zinc-400 text-zinc-600">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Mollitia assumenda dignissimos tempore nam, atque doloremque quam unde iure voluptatem ullam!
        </p>
      </div>
      <div className="grid grid-cols-3 gap-4 w-full md:w-10/12">
        <div className="w-full p-2 rounded-md flex flex-col items-center justify-center">
          <span className="text-2xl font-semibold">150</span>
          <span className="dark:text-zinc-400 text-zinc-600">Posts</span>
        </div>
        <div className="w-full p-2 rounded-md flex flex-col items-center justify-center">
          <span className="text-2xl font-semibold">300</span>
          <span className="dark:text-zinc-400 text-zinc-600">Followers</span>
        </div>
        <div className="w-full p-2 rounded-md flex flex-col items-center justify-center">
          <span className="text-2xl font-semibold">200</span>
          <span className="dark:text-zinc-400 text-zinc-600">Following</span>
        </div>
      </div>
      <div className="w-full flex justify-center md:w-11/12 gap-4 md:gap-6 px-3">
        <Button className="w-1/2">
          Follow
        </Button>
        <Button className="w-1/2" variant="secondary">
          Message
        </Button>
      </div>
      <Separator />
      <div>
        <h2 className="text-center text-muted-foreground">User hasn't posted anything yet</h2>
      </div>
    </div>
  )
}

export default ProfilePage