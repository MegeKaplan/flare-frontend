"use client"
import { redirect } from "next/navigation"
import { useEffect } from "react"
import { toast } from "sonner"

const ProfilePageRedirect = () => {
  useEffect(() => {
    const username = localStorage.getItem("username") || localStorage.getItem("userId")
    if (username) {
      redirect(`/profile/${username}`)
    } else {
      toast.error("You must be logged in to view your profile.")
      redirect("/login")
    }
  }, [])
}

export default ProfilePageRedirect