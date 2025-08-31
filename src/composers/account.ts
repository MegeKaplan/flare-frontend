import accountService from "@/services/accountService"
import mediaService from "@/services/mediaService"
import { ComposedAccount } from "@/types/account"

export const getComposedAccount = async (id: string): Promise<ComposedAccount> => {
  const { data: accountData } = await accountService.getAccountById(id)
  const composed: ComposedAccount = { ...accountData }

  if (composed.profileImageId) {
    const { data } = await mediaService.getMediaById(composed.profileImageId)
    composed.profileImageUrl = data.url
  }

  if (composed.bannerImageId) {
    const { data } = await mediaService.getMediaById(composed.bannerImageId)
    composed.bannerImageUrl = data.url
  }

  return composed
}
