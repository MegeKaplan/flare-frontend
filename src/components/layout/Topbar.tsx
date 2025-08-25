"use client"
import { Icons } from "@/lib/icons"
import Link from "next/link"
import BrandLogo from "@/components/BrandLogo"

const Topbar = () => {
  return (
    <div className="
    flex flex-row md:flex-col items-center justify-between md:justify-center 
    bg-zinc-100 md:dark:bg-zinc-900 dark:bg-zinc-900/20 
    border-b md:border-t dark:border-b-zinc-900 border-b-zinc-50 md:dark:border-t-zinc-950 border-t-zinc-200 
    relative md:fixed top-0 md:top-30 left-1/2 md:left-8 -translate-x-1/2 md:translate-x-0 
    px-1 md:py-2
    rounded-none md:rounded-lg 
    w-full md:w-auto 
    ">
      <div>
        <BrandLogo className="static ml-2 md:hidden" byMegebaseText={false} />
      </div>
      <div className="flex items-center justify-center flex-row md:flex-col">
        <Link href="/messages" className="p-4"><Icons.messages /></Link>
        <Link href="/notifications" className="p-4"><Icons.bell /></Link>
        <Link href="/settings" className="p-4"><Icons.settings /></Link>
      </div>
    </div>
  )
}

export default Topbar