"use client"
import { redirect } from "next/navigation"

const ProfilePageRedirect = () => {
  const username = "Username"
  redirect(`/profile/${username}`)
}

export default ProfilePageRedirect