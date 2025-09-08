import accountService from "@/services/accountService"
import { graphService } from "@/services/graphService"
import mediaService from "@/services/mediaService"
import { ComposedAccount } from "@/types/account"

export const getComposedAccount = async (id: string): Promise<ComposedAccount> => {
  const { data: accountData } = await accountService.getAccountById(id)
  const composed: ComposedAccount = { ...accountData }

  composed.profileImageUrl = "/images/default-profile.png"
  composed.bannerImageUrl = "/images/default-banner.png"

  if (composed.profileImageId) {
    const { data } = await mediaService.getMediaById(composed.profileImageId)
    composed.profileImageUrl = data.urls.raw
  }

  if (composed.bannerImageId) {
    const { data } = await mediaService.getMediaById(composed.bannerImageId)
    composed.bannerImageUrl = data.urls.raw
  }

  const { data: userGraphData } = await graphService.getUser(composed.id)
  composed.followers = (userGraphData as any)?.user?.followers?.map((f: any) => f.id) || []
  composed.following = (userGraphData as any)?.user?.follows?.map((f: any) => f.id) || []

  return composed
}
