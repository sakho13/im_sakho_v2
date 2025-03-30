import { renderHook, act } from "@testing-library/react"
import { useEncodeUrl } from "@/hooks/useEncodeUrl"

describe("hooks/useEncodeUrl", () => {
  test("通常文字URIエンコード", () => {
    const { result } = renderHook(() => useEncodeUrl())

    expect(result.current.text).toBe("")
    expect(result.current.encoded).toBe("")

    act(() => {
      result.current.onChangeText("some text")
    })

    expect(result.current.text).toBe("some text")
    expect(result.current.encoded).toBe("some%20text")
  })
})
