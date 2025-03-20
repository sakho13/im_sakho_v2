import { useCallback, useState } from "react"

type Props = {
  onChangeFunction: (value: string) => string
}

export const useOnChangeTextHook = ({ onChangeFunction }: Props) => {
  const [before, setBefore] = useState("")
  const [after, setAfter] = useState("")

  const onChangeText = useCallback(
    (value: string) => {
      setBefore(value)

      try {
        setAfter(onChangeFunction(value))
      } catch {
        setAfter("")
      }
    },
    [onChangeFunction],
  )

  return {
    before,
    after,
    onChangeText,
  }
}
