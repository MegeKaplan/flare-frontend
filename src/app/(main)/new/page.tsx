"use client"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Icons } from "@/lib/icons"

const options = [
  { title: "Post", desc: "Share your thoughts, updates or photos with anyone on the platform", icon: <Icons.image />, path: "/new/post", disabled: false },
  { title: "Story", desc: "Share quick, temporary updates or moments that disappear after a short time", icon: <Icons.aperture />, path: "/new/post?type=story", disabled: false },
  { title: "Community", desc: "Create a space for people to gather, discuss, and share on similar interests", icon: <Icons.users />, path: "/new/community", disabled: true },
  { title: "Poll", desc: "Ask a question and collect opinions or feedback from anyone on the platform", icon: <Icons.chartPie />, path: "/new/poll", disabled: true },
]

const NewPage = () => {
  const router = useRouter()

  return (
    <div className="p-4 md:p-6 grid grid-cols-1 xl:grid-cols-2 gap-4 md:gap-6">
      {options.map((option) => (
        <Card
          key={option.title}
          className={`cursor-pointer transition p-4 md:p-6 flex flex-row items-center gap-2 text-center ${option.disabled ? "opacity-50 cursor-not-allowed select-none" : "hover:scale-95"}`}
          onClick={() => !option.disabled && router.push(option.path)}
        >
          <div className="p-3 flex items-center justify-center">{option.icon}</div>
          <div className="flex flex-col w-full items-start">
            <h3 className="font-semibold">{option.title}</h3>
            <p className="text-sm text-muted-foreground text-left">{option.desc}</p>
          </div>
        </Card>
      ))}
    </div>
  )
}

export default NewPage
