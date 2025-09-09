"use client"
import Image from "next/image"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Icons } from "@/lib/icons"
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { DateTimeFormatOptions, useFormatter, useNow } from "next-intl"
import { ComposedPost } from "@/types/content"
import OptimisticToggle from "../ui/OptimisticToggle"
import { graphService } from "@/services/graphService"
import { toast } from "sonner"
import useContentStore from "@/store/useContentStore"

const PostCard = ({ post }: { post: ComposedPost }) => {
  const dateFormatter = useFormatter();
  const now = useNow({ updateInterval: 1000 * 30 });
  const [showFullDate, setShowFullDate] = useState(false);
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [totalSlides, setTotalSlides] = useState(0);
  const [likes, setLikes] = useState<string[]>(post.likes || []);
  const myUserId = typeof window !== "undefined" ? localStorage.getItem("userId") || "" : "";
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const cardRef = useRef<HTMLDivElement | null>(null)
  const [inView, setInView] = useState<boolean>(false);
  const { audioMuted, setAudioMuted } = useContentStore();

  useEffect(() => {
    videoRefs.current.map((video, index) => {
      if (!video) return;
      video.muted = audioMuted;
      if (inView && currentSlide === index + 1) {
        video.play().catch(() => { });
      } else {
        video.pause();
      }
    });
  }, [currentSlide, inView]);

  const muteToggle = () => {
    const prev = audioMuted;
    setAudioMuted(!prev);
  };

  useEffect(() => {
    videoRefs.current.map((video) => {
      if (!video) return;
      video.muted = audioMuted;
    });
  }, [audioMuted]);

  useEffect(() => {
    if (!cardRef.current) return

    const observer = new IntersectionObserver(
      entries => {
        const entry = entries[0]
        setInView(entry.isIntersecting)
      },
      { threshold: 0.9 }
    )

    observer.observe(cardRef.current)

    return () => observer.disconnect()
  }, [])

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

  const handleShare = async () => {
    try {
      navigator.clipboard
        .writeText(`${window.location.origin}/post/${post.id}`)
        .then(() => {
          toast.info("Post link copied to clipboard!");
        })
        .catch((err) => {
          throw err;
        });
    } catch (err) {
      toast.error("Failed to copy link.");
    }
  };

  return (
    <div className="w-full flex flex-col items-center max-w-xl rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-900 shadow p-4 gap-2 dark:border" ref={cardRef}>
      <div className="w-full h-12 flex items-center justify-between">
        <div className="flex items-center justify-center gap-3 w-full">
          <Link href={`/profile/${post.creator?.username}`}>
            <Avatar className="size-14">
              <AvatarImage
                src={post.creator?.profileImageUrl}
                alt="Profile Image"
                className="size-full"
              />
              <AvatarFallback className="text-2xl">{post.creator?.username?.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
          </Link>
          <div className="grid grid-rows-2 w-full truncate">
            <Link href={`/profile/${post.creator?.username}`} className="h-full font-semibold text-xl flex items-center mr-4 truncate">
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
            <Link href={`/post/${post.id}/edit`} className="h-full flex items-center justify-center">
              <Icons.edit className="size-6 dark:text-zinc-400 text-zinc-500 hover:text-zinc-400 dark:hover:text-zinc-200 transition cursor-pointer" />
            </Link>
          )
        }
      </div>
      <div className="w-full py-1">
        <p className="indent-3">
          {post.content}
        </p>
      </div>
      {
        post.media && post.media.length > 0 && (
          <Carousel className="w-full h-auto rounded-lg overflow-hidden" setApi={setCarouselApi}>
            <CarouselContent className="gap-4">
              {post.media!.map((media: { id: string; urls: { raw: string; processed: string | null }, mimetype: string }, index: number) => (
                <CarouselItem
                  key={index}
                  className="size-full relative aspect-square bg-zinc-800 rounded-lg overflow-hidden"
                >
                  {
                    media.mimetype.startsWith("video/") ? (
                      <video
                        src={media.urls.raw}
                        className="size-full object-cover hover:object-fill select-none"
                        autoPlay
                        ref={el => { videoRefs.current[index] = el }}
                        playsInline
                        loop
                      />
                    ) : (
                      <Image
                        src={media.urls.raw}
                        alt={`Post Media ${index + 1}`}
                        className="w-full object-cover hover:object-fill select-none"
                        fill
                      />
                    )
                  }
                </CarouselItem>
              ))}
            </CarouselContent>
            {totalSlides > 1 && (
              <div className="absolute bottom-2 left-2 bg-zinc-900/30 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-md">
                <span>{currentSlide} / {totalSlides}</span>
              </div>
              // <span className="bg-zinc-900 absolute -bottom-2 left-1/2 -translate-x-1/2 px-2 py-1 rounded-t-md">{currentSlide} / {totalSlides}</span>
            )}
            {
              post.media!.some(media => media.mimetype.startsWith("video/")) && (
                <button
                  onClick={muteToggle}
                  className="absolute bottom-2 right-2 bg-zinc-900/30 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-sm"
                >
                  {audioMuted ? <Icons.volume /> : <Icons.volume2 />}
                </button>
              )
            }
          </Carousel>
        )
      }
      {/* {post.media && post.media.length === 1 && (
        <div className="w-full h-auto rounded-lg overflow-hidden relative aspect-square bg-zinc-800">
          {
            post.media[0]?.mimetype.startsWith("video/") ? (
              <video
                src={post.media[0]?.urls.raw}
                className="size-full object-cover hover:object-fill select-none"
                autoPlay
                ref={el => { videoRefs.current[0] = el }}
                playsInline
              />
            ) : (
              <Image
                src={post.media[0]?.urls.raw}
                alt={`Post Media`}
                className="w-full object-cover hover:object-fill select-none"
                fill
              />
            )
          }
        </div>
      )} */}
      <div className="w-full flex items-center justify-between pt-2">
        <div className="w-full flex items-center justify-start gap-5">
          <div className="flex items-center w-10">
            <OptimisticToggle
              initialState={likes.includes(myUserId)}
              action={async () => {
                if (!myUserId) return toast.error("You must be logged in to like posts.")
                setLikes(prev => [...prev, myUserId])
                await graphService.likeContent(myUserId, post.id || "")
              }}
              undoAction={async () => {
                if (!myUserId) return
                setLikes(prev => prev.filter(id => id !== myUserId))
                await graphService.unlikeContent(myUserId, post.id || "")
              }}
            >
              {(active, loading) => (
                <div className={`flex items-center justify-center gap-2 ${myUserId && active ? "text-red-500" : "dark:text-zinc-400 text-zinc-500 hover:text-zinc-400"}`}>
                  <Icons.heart
                    className="size-7 cursor-pointer transition"
                    fill={myUserId && active ? "currentColor" : "none"}
                  />
                  <span className="text-xl transition">{likes.length}</span>
                </div>
              )}
            </OptimisticToggle>
          </div>
          <div className="flex items-center w-10">
            <div className={`flex items-center justify-center gap-2 dark:text-zinc-400 text-zinc-500 hover:text-zinc-400`}>
              <Icons.comment
                className="size-7 cursor-pointer transition"
              />
              <span className="text-xl transition">0</span>
            </div>
          </div>
          <div className="flex items-center w-10">
            <div className={`flex items-center justify-center gap-2 dark:text-zinc-400 text-zinc-500 hover:text-zinc-400`}>
              <Icons.save
                className="size-7 cursor-pointer transition"
              />
              <span className="text-xl transition">0</span>
            </div>
          </div>
        </div>
        <div>
          <Icons.share
            className="size-7 dark:text-zinc-400 text-zinc-500 hover:text-zinc-400 dark:hover:text-zinc-200 transition cursor-pointer"
            onClick={handleShare}
          />
        </div>
      </div>
    </div>
  )
}

export default PostCard