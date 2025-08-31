"use client"
import PostCard from "@/components/content/PostCard"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { getComposedPost } from "@/composers/content"
import { ComposedPost } from "@/types/content"

const PostPage = () => {
  const { postId } = useParams<{ username: string; postId: string }>();
  const [postData, setPostData] = useState<ComposedPost | null>(null);

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        if (!postId) return
        setPostData(await getComposedPost(postId))
      } catch (err) {
        toast.error("Failed to fetch post data")
      }
    }

    fetchPostData()
  }, [postId])

  return (
    <div className="size-full flex justify-center items-start p-4">
      {postData ? <PostCard post={postData} /> : <div>Loading...</div>}
    </div>
  )
}

export default PostPage