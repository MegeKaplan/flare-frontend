"use client"
import ComingSoonPage from "@/components/ComingSoon"
import { Icons } from "@/lib/icons"

const NotificationsPage = () => {
  return <ComingSoonPage
    icon={<Icons.bell className="size-10 text-zinc-500 dark:text-zinc-400" />}
    title="Notifications"
    description="The Notifications page is under development. Soon you'll be able to see your notifications here."
  />
}

export default NotificationsPage
