"use client"
import ComingSoonPage from "@/components/ComingSoon"
import { Icons } from "@/lib/icons"

const DiscoverPage = () => {
  return <ComingSoonPage
    icon={<Icons.compass className="size-10 text-zinc-500 dark:text-zinc-400" />}
    title="Discover"
    description="The Discover page is under development. Soon you'll be able to explore trending posts and creators here."
  />
}

export default DiscoverPage
