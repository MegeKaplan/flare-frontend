import contentService from "@/services/contentService";
import { getComposedAccount } from "@/composers/account";
import mediaService from "@/services/mediaService";
import { ComposedPost } from "@/types/content";
import { graphService } from "@/services/graphService";

export const getComposedPost = async (postId: string): Promise<ComposedPost> => {
  const { data: postData } = await contentService.getPost(postId);
  const composed: ComposedPost = { ...postData };

  if (postData.creatorId) {
    composed.creator = await getComposedAccount(postData.creatorId);
  }

  if (postData.mediaIds?.length) {
    const media = await Promise.all(
      postData.mediaIds.map(id => mediaService.getMediaById(id).then(res => res.data))
    );

    composed.media = media;
    composed.mediaUrls = media.map(media => media.urls);
  }

  const { data: likesData } = await graphService.getContent(postId)
  composed.likes = (likesData as any)?.content?.likes.map((user: { id: string }) => user.id) || [];

  return composed
};
