import { renderHook, act } from "@testing-library/react"
import { useConvertJsonYaml } from "@/hooks/useConvertJsonYaml"

describe("hooks/useConvertJsonYaml", () => {
  test("トグルの確認", () => {
    const { result } = renderHook(() => useConvertJsonYaml())

    expect(result.current.mode).toEqual("to-yaml")
    expect(result.current.text).toEqual("")
    expect(result.current.converted).toEqual("")
    expect(result.current.error).toEqual(null)

    act(() => {
      result.current.toggleMode()
    })

    expect(result.current.mode).toEqual("to-json")
    expect(result.current.text).toEqual("")
    expect(result.current.converted).toEqual("")
    expect(result.current.error).toEqual(null)
  })

  test("JSON を YAMLに変換", () => {
    const { result } = renderHook(() => useConvertJsonYaml())

    expect(result.current.mode).toEqual("to-yaml")
    expect(result.current.text).toEqual("")
    expect(result.current.converted).toEqual("")
    expect(result.current.error).toEqual(null)

    act(() => {
      result.current.onChangeText(`{"name":"John","age":30,"city":"New York"}`)
    })

    expect(result.current.mode).toEqual("to-yaml")
    expect(result.current.text).toEqual(
      `{"name":"John","age":30,"city":"New York"}`,
    )
    expect(result.current.converted).toEqual(
      "name: John\nage: 30\ncity: New York\n",
    )
    expect(result.current.error).toEqual(null)
  })

  test("YAML を JSONに変換", () => {
    const { result } = renderHook(() => useConvertJsonYaml())

    expect(result.current.mode).toEqual("to-yaml")
    expect(result.current.text).toEqual("")
    expect(result.current.converted).toEqual("")
    expect(result.current.error).toEqual(null)

    act(() => {
      result.current.toggleMode()
    })

    expect(result.current.mode).toEqual("to-json")

    act(() => {
      result.current.onChangeText(`name: John\nage: 30\ncity: New York`)
    })

    expect(result.current.text).toEqual(`name: John\nage: 30\ncity: New York`)
    expect(result.current.converted).toEqual(
      JSON.stringify({ name: "John", age: 30, city: "New York" }, null, 2),
    )
    expect(result.current.error).toEqual(null)
  })

  test("トグルでリセットされる", () => {
    const { result } = renderHook(() => useConvertJsonYaml())

    expect(result.current.mode).toEqual("to-yaml")
    expect(result.current.text).toEqual("")
    expect(result.current.converted).toEqual("")
    expect(result.current.error).toEqual(null)

    act(() => {
      result.current.onChangeText(`{"name":"John","age":30,"city":"New York"}`)
    })

    expect(result.current.mode).toEqual("to-yaml")
    expect(result.current.text).toEqual(
      `{"name":"John","age":30,"city":"New York"}`,
    )
    expect(result.current.converted).toEqual(
      "name: John\nage: 30\ncity: New York\n",
    )
    expect(result.current.error).toEqual(null)

    act(() => {
      result.current.toggleMode()
    })

    expect(result.current.mode).toEqual("to-json")
    expect(result.current.text).toEqual("")
    expect(result.current.converted).toEqual("")
    expect(result.current.error).toEqual(null)
  })

  test("JSON を YAMLに変換失敗", () => {
    const { result } = renderHook(() => useConvertJsonYaml())

    expect(result.current.mode).toEqual("to-yaml")
    expect(result.current.text).toEqual("")
    expect(result.current.converted).toEqual("")
    expect(result.current.error).toEqual(null)

    act(() => {
      result.current.onChangeText(`{"name":"John","age":30,"city":"New York"`)
    })

    expect(result.current.mode).toEqual("to-yaml")
    expect(result.current.text).toEqual(
      `{"name":"John","age":30,"city":"New York"`,
    )
    expect(result.current.converted).toEqual("")
    expect(result.current.converted).toEqual("")
    expect(result.current.error).toEqual("変換に失敗しました")
  })

  test("YAML を JSONに変換失敗", () => {
    const { result } = renderHook(() => useConvertJsonYaml())

    expect(result.current.mode).toEqual("to-yaml")
    expect(result.current.text).toEqual("")
    expect(result.current.converted).toEqual("")
    expect(result.current.error).toEqual(null)

    act(() => {
      result.current.toggleMode()
    })

    expect(result.current.mode).toEqual("to-json")

    act(() => {
      result.current.onChangeText(`name: John\nage: 30\ncity New York`)
    })

    expect(result.current.text).toEqual(`name: John\nage: 30\ncity New York`)
    expect(result.current.converted).toEqual("")
    expect(result.current.converted).toEqual("")
    expect(result.current.error).toEqual("変換に失敗しました")
  })

  test("空文字列を渡す", () => {
    const { result } = renderHook(() => useConvertJsonYaml())

    expect(result.current.mode).toEqual("to-yaml")
    expect(result.current.text).toEqual("")
    expect(result.current.converted).toEqual("")
    expect(result.current.error).toEqual(null)

    act(() => {
      result.current.onChangeText("")
    })

    expect(result.current.mode).toEqual("to-yaml")
    expect(result.current.text).toEqual("")
    expect(result.current.converted).toEqual("")
    expect(result.current.error).toEqual(null)
  })

  describe("YAMLへ変換", () => {
    test("先頭に改行", () => {
      const { result } = renderHook(() => useConvertJsonYaml())

      expect(result.current.mode).toEqual("to-yaml")
      expect(result.current.text).toEqual("")
      expect(result.current.converted).toEqual("")
      expect(result.current.error).toEqual(null)

      act(() => {
        result.current.onChangeText(
          `\n{"name":"John","age":30,"city":"New York"}`,
        )
      })

      expect(result.current.mode).toEqual("to-yaml")
      expect(result.current.text).toEqual(
        `\n{"name":"John","age":30,"city":"New York"}`,
      )
      expect(result.current.converted).toEqual(
        "name: John\nage: 30\ncity: New York\n",
      )
      expect(result.current.error).toEqual(null)
    })
  })

  describe("JSONへ変換", () => {
    test("先頭に改行", () => {
      const { result } = renderHook(() => useConvertJsonYaml())

      expect(result.current.mode).toEqual("to-yaml")
      expect(result.current.text).toEqual("")
      expect(result.current.converted).toEqual("")
      expect(result.current.error).toEqual(null)

      act(() => {
        result.current.toggleMode()
      })

      expect(result.current.mode).toEqual("to-json")

      act(() => {
        result.current.onChangeText(`\nname: John\nage: 30\ncity: New York`)
      })

      expect(result.current.text).toEqual(
        `\nname: John\nage: 30\ncity: New York`,
      )
      expect(result.current.converted).toEqual(
        JSON.stringify({ name: "John", age: 30, city: "New York" }, null, 2),
      )
      expect(result.current.error).toEqual(null)
    })
  })
})
