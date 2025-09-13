"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { graphService } from "@/services/graphService"
import { Story } from "@/types/content"
import { toast } from "sonner"
import { Icons } from "@/lib/icons"
import { Separator } from "./ui/separator"
import { getComposedPost } from "@/composers/content"

type StorybarProps = {
  userId: string
}

const Storybar = ({ userId }: StorybarProps) => {
  const router = useRouter()
  const [stories, setStories] = useState<Story[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStories = async () => {
      try {
        setLoading(true)
        const res = await graphService.followingStories(userId) as any
        const ids: string[] = res.data?.followingStories.map((story: any) => story.id) || []

        const composedStories = await Promise.all(
          ids.map(id => getComposedPost(id).then((res: any) => res))
        )

        setStories(composedStories)
      } catch (err) {
        toast.error("Failed to load stories")
      } finally {
        setLoading(false)
      }
    }

    fetchStories()
  }, [userId])

  if (loading) return (
    <div className="p-4 text-sm text-muted-foreground w-full h-32 flex flex-col items-center justify-around">
      <div className="flex items-center justify-center flex-row">
        <Icons.loader className="mr-2 size-4 animate-spin" />
        <span>Loading stories...</span>
      </div>
      <Separator />
    </div>
  )

  return (
    <div className="w-full">
      <ScrollArea className="w-full whitespace-nowrap pb-4 pt-2">
        <div className="flex items-center gap-4 p-1">
          <div
            className="flex items-center justify-center cursor-pointer ring-2 ring-zinc-400 p-1 rounded-full hover:opacity-80 hover:scale-95 transition"
            onClick={() => router.push(`/new/post?type=story`)}
          >
            <Avatar className="size-16 flex items-center justify-center">
              <Icons.plus className="size-8 text-zinc-400" />
            </Avatar>
          </div>
          {stories.map((story) => (
            <div
              key={story.id}
              className="flex items-center justify-center cursor-pointer ring-2 ring-primary p-1 rounded-full hover:opacity-80 hover:scale-95 transition"
              onClick={() => router.push(`/post/${story.id}`)}
            >
              <Avatar className="size-16">
                <AvatarImage src={story.mediaUrls && story.mediaUrls[0].raw || "/images/default-profile.png"} alt="story" />
                <AvatarFallback>{story.content && story.content.slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" hidden />
      </ScrollArea>
      <Separator />
    </div>
  )
}

export default Storybar
