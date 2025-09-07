"use client"
import ComingSoonPage from "@/components/ComingSoon"
import { Icons } from "@/lib/icons"

const MessagesPage = () => {
  return <ComingSoonPage
    icon={<Icons.messages className="size-10 text-zinc-500 dark:text-zinc-400" />}
    title="Messages"
    description="The Messages page is under development. Soon you'll be able to see your messages here."
  />
}

export default MessagesPage
