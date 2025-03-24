import { act, renderHook } from "@testing-library/react"
import { useBrainFuck } from "@/hooks/useBrainFuck"

describe("hooks/useBrainFuck", () => {
  test("on simply change code", () => {
    const { result } = renderHook(() => useBrainFuck())

    expect(result.current.code).toBe("")
    expect(result.current.output).toBe("")
    expect(result.current.pointer).toBe(0)
    expect(result.current.memory.every((m) => m == 0)).toBe(true)

    act(() => {
      result.current.onChangeCode(">")
    })

    expect(result.current.code).toBe(">")
    expect(result.current.output).toBe("")
    expect(result.current.pointer).toBe(0)
    expect(result.current.memory.every((m) => m == 0)).toBe(true)
  })

  test("on run code that shift pointer", () => {
    const { result } = renderHook(() => useBrainFuck())

    expect(result.current.code).toBe("")
    expect(result.current.output).toBe("")
    expect(result.current.pointer).toBe(0)
    expect(result.current.memory.every((m) => m == 0)).toBe(true)

    act(() => {
      result.current.onChangeCode(">>>><")
    })

    act(() => {
      result.current.run()
    })

    expect(result.current.code).toBe(">>>><")
    expect(result.current.output).toBe("")
    expect(result.current.pointer).toBe(2)
    expect(result.current.memory.every((m) => m == 0)).toBe(true)
  })
})
