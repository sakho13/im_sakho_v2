"use client"

import { pageview } from "@/lib/gtag"
import { usePathname } from "next/navigation"
import { useEffect } from "react"

export function GoogleAnalytics() {
  const pathName = usePathname()

  useEffect(() => {
    pageview(pathName)
  }, [pathName])

  return null
}
