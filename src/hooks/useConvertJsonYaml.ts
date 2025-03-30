import { useState } from "react"
import { dump, load, JSON_SCHEMA } from "js-yaml"

export function useConvertJsonYaml() {
  const [mode, setMode] = useState<"to-json" | "to-yaml">("to-yaml")
  const [text, setText] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [converted, setConverted] = useState("")

  const toggleMode = () => {
    setText("")
    setConverted("")
    setMode((prev) => (prev === "to-json" ? "to-yaml" : "to-json"))
  }

  const onChangeText = (value: string) => {
    if (value === text) return

    if (value === "") {
      setConverted("")
      setError(null)
      setText("")
      return
    }

    setText(value)
    try {
      onConvert(value)
      setError(null)
    } catch {
      setError("変換に失敗しました")
    }
  }

  const onConvert = (value: string) => {
    if (mode === "to-json") {
      const json = load(value, { schema: JSON_SCHEMA })
      setConverted(JSON.stringify(json, null, 2))
    } else {
      const yaml = dump(JSON.parse(value), { indent: 2 })
      setConverted(yaml)
    }
  }

  return { mode, text, converted, error, toggleMode, onChangeText }
}
