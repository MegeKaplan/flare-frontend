"use client"
import { useEffect, useState, useRef } from "react"
import PostCard from "@/components/content/PostCard"
import contentService from "@/services/contentService"
import { getComposedPost } from "@/composers/content"
import { ComposedPost } from "@/types/content"
import { toast } from "sonner"
import LoadingAnimation from "@/components/LoadingAnimation"

const POST_FETCH_LIMIT = 4

const HomePage = () => {
  const [posts, setPosts] = useState<ComposedPost[]>([])
  const [offset, setOffset] = useState(0)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const observerRef = useRef<HTMLDivElement>(null)

  const fetchPosts = async () => {
    if (loading || !hasMore) return
    setLoading(true)
    try {
      const { data: rawPosts } = await contentService.getPosts({ limit: POST_FETCH_LIMIT, offset: offset * POST_FETCH_LIMIT })

      if (rawPosts.length < POST_FETCH_LIMIT) setHasMore(false)

      const composedPosts = await Promise.all(rawPosts.map(post => getComposedPost(post.id!)))

      setPosts(prev => [...prev, ...composedPosts])
      setOffset(prev => prev + 1)
    } catch (err) {
      console.error(err)
      toast.error("Failed to load posts")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  useEffect(() => {
    if (!observerRef.current) return

    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          fetchPosts()
        }
      },
      { rootMargin: "200px" }
    )

    observer.observe(observerRef.current)

    return () => {
      if (observerRef.current) observer.unobserve(observerRef.current)
    }
  }, [loading, hasMore])

  return (
    <div className="w-full flex flex-col items-center gap-4 lg:gap-8 p-4">
      {posts.map(post => <PostCard key={post.id} post={post} />)}
      <div ref={observerRef} className="h-4" />
      {loading && <LoadingAnimation />}
      {!hasMore && <span className="text-zinc-500">Looks like we've reached the end</span>}
    </div>
  )
}

export default HomePage
