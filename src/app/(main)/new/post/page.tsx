"use client"
import React, { useState, ChangeEvent } from "react"
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
import { useRouter } from "next/navigation"
import { graphService } from "@/services/graphService"

const NewPostPage = () => {
  const [mediaFiles, setMediaFiles] = useState<File[]>([])
  const [data, setData] = useState({
    content: "",
  })
  const { setLoading } = useStatusStore()
  const router = useRouter()

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return
    setMediaFiles((prev) => [...prev, ...Array.from(files)])
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!data.content && mediaFiles.length === 0) {
      toast.error("Please add content or media before posting")
      return
    }

    try {
      setLoading(true)

      let mediaIds: string[] = []
      if (mediaFiles.length !== 0) {
        const formData = new FormData()
        mediaFiles.forEach(file => formData.append("files", file))

        const uploadMediaRes = await mediaService.uploadMedia(formData)
        mediaIds = uploadMediaRes.data.map((m: any) => m._id)
      }

      const createPostRes = await contentService.createPost({ content: data.content, mediaIds: mediaIds || [] })

      const userId = localStorage.getItem("userId");

      createPostRes.data && await graphService.createContent(userId!, createPostRes.data.id!, "post", createPostRes.data.expiresAt || null)

      toast.success("Post created successfully!")
      router.push(`/post/${createPostRes.data.id}`)
    } catch (err) {
      toast.error("Failed to create post")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full flex justify-center items-center md:items-start flex-col md:flex-row p-4 md:p-2 gap-8">
      <Carousel className="aspect-square size-full w-full">
        <CarouselContent>
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
          Create Post
        </Button>
      </form>
    </div>
  )
}

export default NewPostPage;
