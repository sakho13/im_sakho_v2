import {
  stepDurationSeconds,
  stepIndexAtElapsed,
} from "@/lib/functions/kantele/timing"

describe("lib/functions/kantele/timing", () => {
  describe("stepDurationSeconds", () => {
    test("120 BPM, 2 steps/beat の場合は 0.25 秒", () => {
      expect(stepDurationSeconds(120, 2)).toBeCloseTo(0.25)
    })

    test("60 BPM, 1 step/beat の場合は 1 秒", () => {
      expect(stepDurationSeconds(60, 1)).toBeCloseTo(1)
    })
  })

  describe("stepIndexAtElapsed", () => {
    test("境界値ちょうどでは切り捨てて次のステップにならない", () => {
      expect(stepIndexAtElapsed(0.5, 0.25)).toBe(2)
    })

    test("境界値の直前は前のステップのまま", () => {
      expect(stepIndexAtElapsed(0.49, 0.25)).toBe(1)
    })

    test("経過時間0はステップ0", () => {
      expect(stepIndexAtElapsed(0, 0.25)).toBe(0)
    })
  })
})
