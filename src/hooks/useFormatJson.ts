import { useCallback, useState } from "react"
import { useOnChangeTextHook } from "./base/useOnChangeTextHook"

export function useFormatJson() {
  const [space, setSpace] = useState(2)

  const onChangeFunction = useCallback(
    (value: string) => {
      return JSON.stringify(JSON.parse(value), null, space)
    },
    [space],
  )

  const { before, after, onChangeText } = useOnChangeTextHook({
    onChangeFunction,
  })

  const onChangeSpace = (value: number) => {
    setSpace(value)

    onChangeText(before)
  }

  return {
    textJson: before,
    formattedJson: after,
    onChangeText,

    space,
    onChangeSpace,
  }
}
