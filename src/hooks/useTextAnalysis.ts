import { useCallback, useState, useMemo } from "react"

export function useTextAnalysis() {
  const [text, setText] = useState("")

  const onChangeText = useCallback((value: string) => {
    setText(value)
  }, [])

  const stats = useMemo(() => {
    const charCount = text.length
    const spaceCount = (text.match(/ /g) || []).length
    const noLineBreaks = text.replace(/\r?\n/g, "")
    const reversed = text.split("").reverse().join("")

    // HTML entities conversion
    const htmlEntities = text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;")

    // Escape special characters
    const escaped = text
      .replace(/\\/g, "\\\\")
      .replace(/"/g, '\\"')
      .replace(/'/g, "\\'")
      .replace(/\n/g, "\\n")
      .replace(/\r/g, "\\r")
      .replace(/\t/g, "\\t")

    // Detailed character count
    const alphabetCount = (text.match(/[a-zA-Z]/g) || []).length
    const digitCount = (text.match(/[0-9]/g) || []).length
    const hiraganaCount = (text.match(/[\u3040-\u309F]/g) || []).length
    const katakanaCount = (text.match(/[\u30A0-\u30FF]/g) || []).length
    const kanjiCount = (text.match(/[\u4E00-\u9FFF]/g) || []).length
    const symbolCount = (text.match(/[^\w\s\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF]/gu) || []).length
    const lineCount = text.split(/\r?\n/).length
    const wordCount = text.trim() === "" ? 0 : text.trim().split(/\s+/).length

    // Unicode escape
    const unicodeEscaped = text
      .split("")
      .map((char) => {
        const code = char.charCodeAt(0)
        if (code > 127) {
          return "\\u" + code.toString(16).padStart(4, "0")
        }
        return char
      })
      .join("")

    return {
      charCount,
      spaceCount,
      noLineBreaks,
      reversed,
      htmlEntities,
      escaped,
      unicodeEscaped,
      alphabetCount,
      digitCount,
      hiraganaCount,
      katakanaCount,
      kanjiCount,
      symbolCount,
      lineCount,
      wordCount,
    }
  }, [text])

  return {
    text,
    onChangeText,
    ...stats,
  }
}
