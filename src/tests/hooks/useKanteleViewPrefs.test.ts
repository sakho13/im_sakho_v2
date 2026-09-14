import { act, renderHook, waitFor } from "@testing-library/react"
import { useKanteleViewPrefs } from "@/hooks/useKanteleViewPrefs"
import { saveViewPrefs } from "@/lib/functions/kantele/kanteleViewPrefs"

describe("hooks/useKanteleViewPrefs", () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  test("初期状態は低音が下", () => {
    const { result } = renderHook(() => useKanteleViewPrefs())
    expect(result.current.stringOrder).toBe("bassBottom")
  })

  test("保存済みの並び順を復元する", async () => {
    saveViewPrefs({ stringOrder: "bassTop" })

    const { result } = renderHook(() => useKanteleViewPrefs())

    await waitFor(() => {
      expect(result.current.stringOrder).toBe("bassTop")
    })
  })

  test("反転した並び順は保存され、次回も復元される", () => {
    const { result, unmount } = renderHook(() => useKanteleViewPrefs())

    act(() => {
      result.current.toggleStringOrder()
    })
    expect(result.current.stringOrder).toBe("bassTop")

    unmount()

    const remounted = renderHook(() => useKanteleViewPrefs())
    expect(remounted.result.current.stringOrder).toBe("bassTop")
  })
})
