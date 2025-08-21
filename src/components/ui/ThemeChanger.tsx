"use client"
import { useTheme } from 'next-themes'
import { Button } from "@/components/ui/button"
import { useEffect, useState } from 'react'

export const ThemeChanger = () => {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className='flex items-center justify-center flex-col gap-2 m-2'>
      <Button onClick={() => setTheme('light')}>Light Mode</Button>
      <Button onClick={() => setTheme('dark')}>Dark Mode</Button>
    </div>
  )
}
