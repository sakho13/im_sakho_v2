import { useEffect, useState } from "react"
import { convertMdToHtml } from "@/lib/functions/convertMdToHtml"

type Props = {
  md: string
}

export function useConvertMd({ md }: Props) {
  const [html, setHtml] = useState<string>("")

  useEffect(() => {
    convertMdToHtml(md).then((file) => {
      setHtml(String(file))
    })
  }, [md])

  return {
    html,
  }
}
