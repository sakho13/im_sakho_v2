import {
  noteNameToFrequency,
  transposeNoteName,
} from "@/lib/functions/kantele/noteFrequency"

describe("lib/functions/kantele/noteFrequency", () => {
  describe("noteNameToFrequency", () => {
    test("A4は440Hz", () => {
      expect(noteNameToFrequency("A4")).toBeCloseTo(440)
    })

    test("1オクターブ上は周波数が倍になる", () => {
      expect(noteNameToFrequency("A5")).toBeCloseTo(880)
    })

    test("1オクターブ下は周波数が半分になる", () => {
      expect(noteNameToFrequency("A3")).toBeCloseTo(220)
    })

    test("シャープの計算", () => {
      expect(noteNameToFrequency("C4")).toBeCloseTo(261.6255653)
      expect(noteNameToFrequency("C#4")).toBeCloseTo(277.1826309)
    })

    test("不正な文字列はthrowする", () => {
      expect(() => noteNameToFrequency("H4")).toThrow()
      expect(() => noteNameToFrequency("C")).toThrow()
      expect(() => noteNameToFrequency("")).toThrow()
    })
  })

  describe("transposeNoteName", () => {
    test("全音上げる", () => {
      expect(transposeNoteName("C4", 2)).toBe("D4")
    })

    test("オクターブをまたぐ", () => {
      expect(transposeNoteName("B4", 1)).toBe("C5")
    })

    test("下げることもできる", () => {
      expect(transposeNoteName("C4", -1)).toBe("B3")
    })
  })
})
