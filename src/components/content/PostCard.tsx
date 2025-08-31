"use client"
import { Post } from "@/services/contentService"
import Image from "next/image"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Icons } from "@/lib/icons"
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import Link from "next/link"
import { useEffect, useState } from "react"
import { DateTimeFormatOptions, useFormatter, useNow } from "next-intl"

const PostCard = ({ post }: { post: Post }) => {
  const dateFormatter = useFormatter();
  const now = useNow({ updateInterval: 1000 * 30 });
  const [showFullDate, setShowFullDate] = useState(false);
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [totalSlides, setTotalSlides] = useState(0);

  useEffect(() => {
    if (!carouselApi) return;

    setTotalSlides(carouselApi.scrollSnapList().length);
    setCurrentSlide(carouselApi.selectedScrollSnap() + 1);

    const onSelect = () => setCurrentSlide(carouselApi.selectedScrollSnap() + 1);
    carouselApi.on("select", onSelect);

    return () => {
      carouselApi.off("select", onSelect as () => void);
    };
  }, [carouselApi]);


  const dateOptions: DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit",
  }

  const createdAt = post.createdAt ? new Date(post.createdAt) : new Date();

  return (
    <div className="w-full flex flex-col items-center max-w-xl rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-900 shadow p-4 gap-4 dark:border">
      <div className="w-full h-16 flex items-center justify-between">
        <div className="flex items-center justify-center gap-3 w-full">
          <Avatar className="size-14">
            <AvatarImage
              src={post.creator?.profileImageUrl}
              alt="Profile Image"
              className="size-full"
            />
            <AvatarFallback className="text-2xl">{post.creator?.username?.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="grid grid-rows-2 w-full">
            <Link href={`/profile/${post.creator?.username}`} className="h-full font-semibold text-xl flex items-center">
              {/* {post.creator?.displayName || `@${post.creator?.username}`} */}
              {post.creator?.displayName || `${post.creator?.username}`}
            </Link>
            <div className="h-full text-sm text-zinc-400 flex items-center">
              {
                <span
                  onClick={() => setShowFullDate(!showFullDate)}
                  className="cursor-pointer select-none"
                >
                  {showFullDate
                    ? dateFormatter.dateTime(createdAt, dateOptions)
                    : dateFormatter.relativeTime(createdAt, now)}
                </span>
              }
            </div>
          </div>
        </div>
        {
          post.creator?.id === localStorage.getItem("userId") && (
            <Link href={`${post.id}/edit`} className="h-full flex items-center justify-center">
              <Icons.edit className="size-6 dark:text-zinc-400 text-zinc-500 hover:text-zinc-400 dark:hover:text-zinc-200 transition cursor-pointer" />
            </Link>
          )
        }
      </div>
      {
        post.mediaUrls && post.mediaUrls.length > 0 && (
          <Carousel className="w-full h-auto rounded-lg overflow-hidden" setApi={setCarouselApi}>
            <CarouselContent className="gap-4">
              {post.mediaUrls.map((url, index) => (
                <CarouselItem
                  key={index}
                  className="size-full relative aspect-square bg-zinc-800 rounded-lg overflow-hidden"
                >
                  <Image
                    src={url}
                    alt={`Post Media ${index + 1}`}
                    className="w-full object-cover hover:object-fill select-none"
                    fill
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            {totalSlides > 0 && (
              <div className="absolute bottom-2 left-2 bg-zinc-900/30 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-md">
                <span>{currentSlide} / {totalSlides}</span>
              </div>
              // <span className="bg-zinc-900 absolute -bottom-2 left-1/2 -translate-x-1/2 px-2 py-1 rounded-t-md">{currentSlide} / {totalSlides}</span>
            )}
          </Carousel>
        )
      }
      <div className="w-full">
        <p className="indent-3">
          {post.content}
        </p>
      </div>
      <div className="w-full flex items-center justify-between">
        <div className="w-full flex items-center justify-start gap-4">
          <Icons.heart className="size-7 dark:text-zinc-400 text-zinc-500 hover:text-zinc-400 dark:hover:text-zinc-200 transition cursor-pointer" />
          <Icons.comment className="size-7 dark:text-zinc-400 text-zinc-500 hover:text-zinc-400 dark:hover:text-zinc-200 transition cursor-pointer" />
          <Icons.save className="size-7 dark:text-zinc-400 text-zinc-500 hover:text-zinc-400 dark:hover:text-zinc-200 transition cursor-pointer" />
        </div>
        <div>
          <Icons.share className="size-7 dark:text-zinc-400 text-zinc-500 hover:text-zinc-400 dark:hover:text-zinc-200 transition cursor-pointer" />
        </div>
      </div>
    </div>
  )
}

export default PostCard