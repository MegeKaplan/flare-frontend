"use client"
import PostCard from "@/components/content/PostCard";
import accountService from "@/services/accountService";
import contentService, { Post } from "@/services/contentService";
import mediaService from "@/services/mediaService";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const PostPage = () => {
  const { postId } = useParams<{ username: string; postId: string }>();
  const [postData, setPostData] = useState<Post | null>(null);

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const getPostRes = await contentService.getPost(postId);
        setPostData(getPostRes.data);

        const getAccountRes = await accountService.getAccountById(getPostRes.data?.creatorId!);
        setPostData(prev => ({
          ...prev!,
          creator: getAccountRes.data,
        }));

        const getProfileImageRes = await mediaService.getMediaById(getAccountRes.data.profileImageId!);
        setPostData(prev => ({
          ...prev!,
          creator: {
            ...prev!.creator!,
            profileImageUrl: getProfileImageRes.data.url,
          }
        }));

        let mediaUrls: string[] = [];
        if (getPostRes.data?.mediaIds && getPostRes.data.mediaIds.length > 0) {
          mediaUrls = await Promise.all(
            getPostRes.data?.mediaIds.map(id => mediaService.getMediaById(id).then(res => res.data.url))
          );
        }
        setPostData(prev => ({
          ...prev!,
          mediaUrls,
        }));

      } catch (error) {
        toast.error("Failed to fetch post data");
      }
    }
    if (postId) {
      fetchPostData();
    }
  }, [postId]);

  return (
    <div className="size-full flex justify-center items-start p-4">
      {postData ? <PostCard post={postData} /> : <div>Loading...</div>}
    </div>
  )
}

export default PostPage