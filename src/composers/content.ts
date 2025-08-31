import contentService from "@/services/contentService";
import { getComposedAccount } from "@/composers/account";
import mediaService from "@/services/mediaService";
import { ComposedPost } from "@/types/content";

export const getComposedPost = async (postId: string): Promise<ComposedPost> => {
  const { data: postData } = await contentService.getPost(postId);
  const composed: ComposedPost = { ...postData };

  if (postData.creatorId) {
    composed.creator = await getComposedAccount(postData.creatorId);
  }

  if (postData.mediaIds?.length) {
    composed.mediaUrls = await Promise.all(
      postData.mediaIds.map(id => mediaService.getMediaById(id).then(res => res.data.url))
    );
  }

  return composed
};
