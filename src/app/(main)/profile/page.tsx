"use client"
import { redirect } from "next/navigation"

const ProfilePageRedirect = () => {
  const username = localStorage.getItem("username") || localStorage.getItem("userId") || "flare"
  redirect(`/profile/${username}`)
}

export default ProfilePageRedirect