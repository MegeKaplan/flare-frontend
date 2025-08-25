"use client"
import { Card } from "@/components/ui/card"
import { useLocaleChanger } from "@/hooks/useLocaleChanger"
import { useThemeChanger } from "@/hooks/useThemeChanger"
import { Icons } from "@/lib/icons"
import { Separator } from "@/components/ui/separator"

const SettingsPage = () => {
  const { theme, changeTheme } = useThemeChanger()
  const { changeLocale } = useLocaleChanger()

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
    </div>
  )
}

export default SettingsPage