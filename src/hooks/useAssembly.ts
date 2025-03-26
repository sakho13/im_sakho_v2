import { useCallback, useState } from "react"

export function useAssembly() {
  const [code, setCode] = useState("")

  const onChangeCode = useCallback((value: string) => {
    setCode(value)
  }, [])

  return { code, onChangeCode }
}
