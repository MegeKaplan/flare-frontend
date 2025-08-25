"use client"
import { Icons } from "@/lib/icons"
import Link from "next/link"

const Navbar = () => {
  return (
    <div className="
    flex items-center justify-between 
    bg-zinc-100 dark:bg-zinc-900 
    border-t md:border-b dark:border-t-zinc-800 border-t-zinc-50 dark:border-b-zinc-950 border-b-zinc-200 
    fixed bottom-0 md:bottom-10 left-1/2 -translate-x-1/2 
    px-6 md:px-2 
    rounded-none md:rounded-lg 
    w-full md:w-auto 
    ">
      <Link href="/home" className="p-4"><Icons.home /></Link>
      <Link href="/search" className="p-4"><Icons.search /></Link>
      <Link href="/new" className="p-4"><Icons.plusCircle /></Link>
      <Link href="/discover" className="p-4"><Icons.compass /></Link>
      <Link href="/profile" className="p-4"><Icons.user /></Link>
    </div>
  )
}

export default Navbar