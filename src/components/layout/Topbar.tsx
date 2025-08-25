"use client"
import { Icons } from "@/lib/icons"
import Link from "next/link"
import BrandLogo from "@/components/BrandLogo"
import { usePathname } from "next/navigation"
import { JSX } from "react"

const Topbar = () => {
  const pathname = usePathname();

  const titles: Record<string, JSX.Element | string> = {
    "default": <BrandLogo className="static md:hidden" byMegebaseText={false} />,
    "/search": "Search",
    "/new": "New Post",
    "/discover": "Discover",
    "/profile": "Profile",
    "/messages": "Messages",
    "/notifications": "Notifications",
    "/settings": "Settings",
  }

  const title = titles[pathname] || titles["default"];

  return (
    <div className={`
    flex flex-row md:flex-col items-center justify-between md:justify-center 
    bg-zinc-100 md:dark:bg-zinc-900 dark:bg-zinc-900/20 
    border-b md:border-t dark:border-b-zinc-900 border-b-zinc-50 md:dark:border-t-zinc-950 border-t-zinc-200 
    fixed top-0 md:top-30 left-1/2 md:left-8 -translate-x-1/2 md:translate-x-0 
    px-1 md:py-2
    rounded-none md:rounded-lg 
    w-full md:w-auto 
    h-16 md:h-min
    ${pathname !== "/home" && "md:hidden"}
    `}>
      <div className="static ml-2 md:hidden text-2xl font-bold">
        {title}
      </div>
      <div className="flex items-center justify-center flex-row md:flex-col">
        {
          pathname !== "/home" ?
            <Link href="/home" className="py-4 flex items-center gap-1 mr-4 text-lg">
              <Icons.arrowLeft />
              <span>Back</span>
            </Link> :
            <>
              <Link href="/messages" className="p-4"><Icons.messages /></Link>
              <Link href="/notifications" className="p-4"><Icons.bell /></Link>
              <Link href="/settings" className="p-4"><Icons.settings /></Link>
            </>
        }
      </div>
    </div >
  )
}

export default Topbar