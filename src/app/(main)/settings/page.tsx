"use client"
import { Card } from "@/components/ui/card"
import { useLocaleChanger } from "@/hooks/useLocaleChanger"
import { useThemeChanger } from "@/hooks/useThemeChanger"
import { Icons } from "@/lib/icons"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { useEffect } from "react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

const SettingsPage = () => {
  const { theme, changeTheme } = useThemeChanger()
  const { changeLocale } = useLocaleChanger()
  const router = useRouter()

  useEffect(() => {
    const userId = localStorage.getItem("userId")
    if (!userId) {
      toast.error("You must be logged in to access settings.")
      router.push("/login")
    }
  }, [])

  const handleLogout = () => {
    localStorage.clear()
    toast.success("Logged out successfully.")
    router.push("/login")
  }

  return (
    <div className="w-full flex flex-col p-4 gap-4">
      <div className="w-full flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <Icons.palette />
          <h2 className="text-xl">Appearance</h2>
        </div>
        <Card className="w-full p-4 bg-zinc-100 dark:bg-zinc-950 flex flex-col gap-4">
          <div className="w-full flex items-center justify-between gap-2">
            <div className="flex flex-col">
              <span>Theme</span>
              <span className="text-sm text-zinc-500 dark:text-zinc-400">Choose between light, dark or system default theme.</span>
            </div>
            <select
              value={theme}
              onChange={(e) => changeTheme(e.target.value as "light" | "dark" | "system")}
              className="bg-transparent outline-none"
            >
              <option value="system">System</option>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>
          <Separator className="h-px w-full bg-zinc-300 dark:bg-zinc-900" />
          <div className="w-full flex items-center justify-between gap-2">
            <div className="flex flex-col">
              <span>Language</span>
              <span className="text-sm text-zinc-500 dark:text-zinc-400">Choose your preferred app language.</span>
            </div>
            <select
              defaultValue={document.cookie.replace(/(?:(?:^|.*;\s*)locale\s*\=\s*([^;]*).*$)|^.*$/, "$1") || "en"}
              onChange={(e) => changeLocale(e.target.value)}
              className="bg-transparent outline-none"
            >
              <option value="en">English</option>
              <option value="tr">Turkish</option>
            </select>
          </div>
        </Card>
      </div>
      <div className="w-full flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <Icons.user />
          <h2 className="text-xl">Account</h2>
        </div>
        <Card className="w-full p-4 bg-zinc-100 dark:bg-zinc-950 flex flex-col gap-4">
          <div className="w-full flex items-center justify-between gap-2">
            <div className="flex flex-col">
              <span>Edit Profile</span>
              <span className="text-sm text-zinc-500 dark:text-zinc-400">Update your personal details.</span>
            </div>
            <Button variant="outline" size="sm" onClick={() => router.push(`/profile/${localStorage.getItem("username") || localStorage.getItem("userId")}/edit`)}>
              Edit Profile
            </Button>
          </div>
          <Separator className="h-px w-full bg-zinc-300 dark:bg-zinc-900" />
          <div className="w-full flex items-center justify-between gap-2">
            <div className="flex flex-col">
              <span>Logout</span>
              <span className="text-sm text-zinc-500 dark:text-zinc-400">Sign out from your account.</span>
            </div>
            <Button variant="destructive" size="sm" onClick={handleLogout}>Logout</Button>
          </div>
        </Card>
      </div>
      <div className="w-full flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <Icons.info />
          <h2 className="text-xl">About</h2>
        </div>
        <Card className="w-full p-4 bg-zinc-100 dark:bg-zinc-950 flex flex-col gap-4">
          <div className="w-full flex items-center justify-between gap-2 flex-col sm:flex-row">
            <div className="flex flex-col">
              <span>About Flare</span>
              <span className="text-sm text-zinc-500 dark:text-zinc-400">
                Open-source project under MIT license, built on Megebase microservices.
              </span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open("https://github.com/MegeKaplan/flare-frontend", "_blank")}
              className="w-full sm:w-auto"
            >
              View on GitHub
            </Button>
          </div>
        </Card>
      </div>

    </div>
  )
}

export default SettingsPage