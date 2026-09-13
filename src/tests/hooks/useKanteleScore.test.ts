import { renderHook, act, waitFor } from "@testing-library/react"
import { toast } from "sonner"
import { useKanteleScore } from "@/hooks/useKanteleScore"
import { saveAutosavedScore } from "@/lib/functions/kantele/kanteleAutosave"
import { createDefaultKanteleScore } from "@/lib/functions/kantele/createDefaultKanteleScore"

jest.mock("sonner", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}))

describe("hooks/useKanteleScore", () => {
  beforeEach(() => {
    window.localStorage.clear()
    jest.clearAllMocks()
  })

  test("初期状態は5弦(メジャー)のデフォルト譜面", () => {
    const { result } = renderHook(() => useKanteleScore())

    expect(result.current.score.tuning).toEqual(["D4", "E4", "F#4", "G4", "A4"])
    expect(result.current.score.notes).toEqual([])
  })

  test("toggleNoteでノートのON/OFFが切り替わる", () => {
    const { result } = renderHook(() => useKanteleScore())

    act(() => {
      result.current.toggleNote(0, 0)
    })
    expect(result.current.score.notes).toEqual([{ string: 0, step: 0 }])

    act(() => {
      result.current.toggleNote(0, 0)
    })
    expect(result.current.score.notes).toEqual([])
  })

  test("placeNoteはノートが無ければ配置し、既にあれば何もしない(トグルしない)", () => {
    const { result } = renderHook(() => useKanteleScore())

    act(() => {
      result.current.placeNote(0, 0)
    })
    expect(result.current.score.notes).toEqual([{ string: 0, step: 0 }])

    act(() => {
      result.current.placeNote(0, 0)
    })
    expect(result.current.score.notes).toEqual([{ string: 0, step: 0 }])
  })

  test("setTuningNoteで指定した弦だけ音名が変わる", () => {
    const { result } = renderHook(() => useKanteleScore())

    act(() => {
      result.current.setTuningNote(1, "B4")
    })

    expect(result.current.score.tuning).toEqual(["D4", "B4", "F#4", "G4", "A4"])
  })

  test("addStringで弦が1本増える", () => {
    const { result } = renderHook(() => useKanteleScore())

    act(() => {
      result.current.addString()
    })

    expect(result.current.score.tuning).toHaveLength(6)
  })

  test("removeStringで弦とそれに紐づくノートが削除され、上位のインデックスが詰まる", () => {
    const { result } = renderHook(() => useKanteleScore())

    act(() => {
      result.current.toggleNote(1, 0)
      result.current.toggleNote(2, 1)
    })

    act(() => {
      result.current.removeString(1)
    })

    expect(result.current.score.tuning).toEqual(["D4", "F#4", "G4", "A4"])
    expect(result.current.score.notes).toEqual([{ string: 1, step: 1 }])
  })

  test("applyTuningPresetで15弦プリセットに置き換わる", () => {
    const { result } = renderHook(() => useKanteleScore())

    act(() => {
      result.current.applyTuningPreset("15-diatonic")
    })

    expect(result.current.score.tuning).toHaveLength(15)
  })

  test("setBpm / setTitle で値が更新される", () => {
    const { result } = renderHook(() => useKanteleScore())

    act(() => {
      result.current.setBpm(140)
      result.current.setTitle("マイソング")
    })

    expect(result.current.score.bpm).toBe(140)
    expect(result.current.score.title).toBe("マイソング")
  })

  test("setLengthで縮小すると範囲外のノートが削除される", () => {
    const { result } = renderHook(() => useKanteleScore())

    act(() => {
      result.current.toggleNote(0, 15)
    })
    act(() => {
      result.current.setLength(8)
    })

    expect(result.current.score.length).toBe(8)
    expect(result.current.score.notes).toEqual([])
  })

  test("exportYamlはYAML文字列を返す", () => {
    const { result } = renderHook(() => useKanteleScore())

    expect(result.current.exportYaml()).toContain("bpm: 100")
  })

  test("importYamlで不正なYAMLを渡すと既存の譜面は保持されエラーになる", () => {
    const { result } = renderHook(() => useKanteleScore())

    act(() => {
      result.current.toggleNote(0, 0)
    })

    act(() => {
      result.current.importYaml("not: [valid")
    })

    expect(result.current.score.notes).toEqual([{ string: 0, step: 0 }])
    expect(toast.error).toHaveBeenCalled()
  })

  test("importYamlで正常なYAMLを渡すと譜面が置き換わる", () => {
    const { result } = renderHook(() => useKanteleScore())

    act(() => {
      result.current.importYaml(result.current.exportYaml())
    })

    expect(toast.success).toHaveBeenCalled()
  })

  test("マウント時に自動保存された譜面があれば復元される", async () => {
    const saved = { ...createDefaultKanteleScore(), title: "復元テスト" }
    saveAutosavedScore(saved)

    const { result } = renderHook(() => useKanteleScore())

    await waitFor(() => {
      expect(result.current.score.title).toBe("復元テスト")
    })
  })
})
