export interface Account {
  id: string
  username?: string
  displayName?: string
  bio?: string
  profileImageId?: string
  bannerImageId?: string
}

export interface ComposedAccount extends Account {
  profileImageUrl?: string | "/images/default-profile.png"
  bannerImageUrl?: string | "/images/default-banner.png"
}