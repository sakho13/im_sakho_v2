import { useOnChangeTextHook } from "./base/useOnChangeTextHook"

export function useEncodeUrl() {
  const { before, after, onChangeText } = useOnChangeTextHook({
    onChangeFunction: (value) => encodeURIComponent(value),
  })

  return {
    text: before,
    encoded: after,
    onChangeText,
  }
}
