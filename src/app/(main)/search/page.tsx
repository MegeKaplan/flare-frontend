"use client"
import ComingSoonPage from "@/components/ComingSoon"
import { Icons } from "@/lib/icons"

const SearchPage = () => {
  return <ComingSoonPage
    icon={<Icons.search className="size-10 text-zinc-500 dark:text-zinc-400" />}
    title="Search"
    description="The Search page is under development. Soon you'll be able to search for posts, creators and topics here."
  />
}

export default SearchPage
