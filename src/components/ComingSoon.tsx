"use client"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ReactNode } from "react"

interface ComingSoonPageProps {
  icon: ReactNode
  title: string
  description: string
}

const ComingSoonPage = ({ icon, title, description }: ComingSoonPageProps) => {
  return (
    <div className="size-full flex items-center justify-center p-4">
      <Card className="w-full md:w-[500px] p-8 flex flex-col items-center justify-center gap-4 text-center bg-zinc-100 dark:bg-zinc-950">
        {icon}
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">{description}</p>
        <Button variant="outline" size="sm" onClick={() => window.open("https://github.com/MegeKaplan/flare-frontend", "_blank")}>
          View Project on GitHub
        </Button>
      </Card>
    </div>
  )
}

export default ComingSoonPage
