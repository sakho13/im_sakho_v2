import { useState } from "react"

export function useEncodeUrl() {
  const [text, setText] = useState("")
  const [encoded, setEncoded] = useState("")

  const onChangeText = (value: string) => {
    setText(value)

    try {
      setEncoded(encodeURIComponent(value))
    } catch {
      setEncoded("")
    }
  }

  return {
    text,
    encoded,
    onChangeText,
  }
}
