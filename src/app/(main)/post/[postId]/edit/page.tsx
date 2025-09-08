"use client"
import React, { useState, ChangeEvent, useEffect } from "react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import Image from "next/image"
import { Icons } from "@/lib/icons"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import useStatusStore from "@/store/useStatusStore"
import { toast } from "sonner"
import mediaService from "@/services/mediaService"
import contentService from "@/services/contentService"
import { useRouter, useParams } from "next/navigation"
import AuthGuard from "@/components/AuthGuard"

const EditPostPage = () => {
  const [mediaFiles, setMediaFiles] = useState<File[]>([])
  const [data, setData] = useState({
    content: "",
  })
  const { setLoading } = useStatusStore()
  const router = useRouter()
  const { postId } = useParams<{ postId: string }>()
  const [existingMedia, setExistingMedia] = useState<{ id: string; urls: { raw: string; processed: string | null } }[]>([])

  const MAX_MEDIA_SIZE_MB = 5

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true)
        const res = await contentService.getPost(postId)
        setData({ content: res.data.content || "" })

        if (res.data.mediaIds?.length) {
          const mediaWithUrls = await Promise.all(
            res.data.mediaIds.map(async id => {
              const mediaRes = await mediaService.getMediaById(id)
              return { id, urls: mediaRes.data.urls }
            })
          )
          setExistingMedia(mediaWithUrls)
        }
      } catch {
        toast.error("Failed to load post")
      } finally {
        setLoading(false)
      }
    }
    if (postId) fetchPost()
  }, [postId, setLoading])

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    const newFiles: File[] = []

    Array.from(files).map(file => {
      if (!file.type.startsWith("image/")) {
        toast.error(`${file.name} is not an image. Please upload only image files.`)
        return
      } else if (file.size > MAX_MEDIA_SIZE_MB * 1024 * 1024) {
        toast.error(`${file.name} size over ${MAX_MEDIA_SIZE_MB}MB. Please upload a smaller file.`)
        return
      }
      newFiles.push(file)
    })

    setMediaFiles((prev) => [...prev, ...newFiles])
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!data.content && mediaFiles.length === 0 && existingMedia.length === 0) {
      toast.error("Please add content or media before updating")
      return
    }

    try {
      setLoading(true)

      let mediaIds = existingMedia.map(media => media.id)

      if (mediaFiles.length) {
        const formData = new FormData()
        mediaFiles.forEach(file => formData.append("files", file))
        const uploadRes = await mediaService.uploadMedia(formData)
        mediaIds = [...mediaIds, ...uploadRes.data.map((media: any) => media._id)]
      }

      const updateRes = await contentService.updatePost(postId, { content: data.content, mediaIds })
      toast.success("Post updated successfully!")
      router.push(`/post/${updateRes.data.id}`)
    } catch {
      toast.error("Failed to update post")
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthGuard>
      <div className="w-full flex justify-center items-center md:items-start flex-col md:flex-row p-4 md:p-2 gap-8">
        <Carousel className="aspect-square size-full w-full">
          <CarouselContent>
            {existingMedia.map((media, index) => (
              <CarouselItem key={index} className="flex items-center justify-center aspect-square relative">
                <Image
                  width={720}
                  height={720}
                  src={media.urls.raw}
                  alt={`media-${index}`}
                  className="h-full w-full object-cover rounded-lg"
                />
                <div>
                  <Button
                    variant="destructive"
                    className="size-20 absolute bottom-10 left-1/2 transform -translate-x-1/2 backdrop-blur-2xl hover:size-24 cursor-pointer"
                    onClick={() => setExistingMedia(prev => prev.filter((_, i) => i !== index))}
                  >
                    <Icons.trash className="size-8" />
                  </Button>
                </div>
              </CarouselItem>
            ))}
            {mediaFiles.map((file, index) => (
              <CarouselItem key={index} className="flex items-center justify-center aspect-square relative">
                <Image
                  width={720}
                  height={720}
                  src={URL.createObjectURL(file)}
                  alt={`media-${index}`}
                  className="h-full w-full object-cover rounded-lg"
                />
                <div>
                  <Button variant="destructive" className="size-20 absolute bottom-10 left-1/2 transform -translate-x-1/2 backdrop-blur-2xl hover:size-24 cursor-pointer" onClick={() => {
                    setMediaFiles((prev) => prev.filter((_, i) => i !== index))
                  }}>
                    <Icons.trash className="size-8" />
                  </Button>
                </div>
              </CarouselItem>
            ))}
            <CarouselItem className="flex items-center justify-center aspect-square">
              <label className="size-11/12 cursor-pointer flex items-center justify-center rounded-lg border-2 border-dashed border-zinc-600 text-zinc-600 hover:border-zinc-500 hover:text-zinc-500 transition">
                <Icons.plus className="size-12" />
                <input
                  type="file"
                  multiple
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
            </CarouselItem>
          </CarouselContent>
        </Carousel>
        <form className="w-full flex flex-col gap-4 md:pt-8" onSubmit={handleSubmit}>
          <div className="grid gap-3 w-full">
            <Label htmlFor="content" className="font-semibold">Content</Label>
            <Textarea
              id="content"
              name="content"
              value={data.content}
              onChange={handleChange}
              rows={4}
              className="w-full max-h-64"
            />
          </div>
          <Button type="submit" className="w-full">
            Update Post
          </Button>
        </form>
      </div>
    </AuthGuard>
  )
}

export default EditPostPage
