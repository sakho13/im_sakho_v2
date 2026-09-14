import {
  calcStepsPerLine,
  FALLBACK_STEPS_PER_LINE,
  splitStepsIntoLines,
} from "@/lib/functions/kantele/kanteleGridLines"

describe("lib/functions/kantele/kanteleGridLines", () => {
  describe("calcStepsPerLine", () => {
    test("表示幅に入るぶんだけ1拍単位で詰める", () => {
      // 360px / 36px = 10マス → 2ステップ/拍なので5拍ぶん(10ステップ)
      expect(
        calcStepsPerLine({
          availableWidth: 360,
          cellWidth: 36,
          stepsPerBeat: 2,
          maxStepsPerLine: 64,
        }),
      ).toBe(10)
    })

    test("拍の途中では折り返さない", () => {
      // 11マスぶんの幅でも、4ステップ/拍なら2拍(8ステップ)に切り下げる
      expect(
        calcStepsPerLine({
          availableWidth: 396,
          cellWidth: 36,
          stepsPerBeat: 4,
          maxStepsPerLine: 64,
        }),
      ).toBe(8)
    })

    test("譜面の長さを超えない", () => {
      expect(
        calcStepsPerLine({
          availableWidth: 2000,
          cellWidth: 36,
          stepsPerBeat: 2,
          maxStepsPerLine: 16,
        }),
      ).toBe(16)
    })

    test("幅が狭くても最低1拍は表示する", () => {
      expect(
        calcStepsPerLine({
          availableWidth: 10,
          cellWidth: 36,
          stepsPerBeat: 3,
          maxStepsPerLine: 64,
        }),
      ).toBe(3)
    })

    test("幅を測れていない場合は暫定値を使う", () => {
      expect(
        calcStepsPerLine({
          availableWidth: 0,
          cellWidth: 36,
          stepsPerBeat: 2,
          maxStepsPerLine: 64,
        }),
      ).toBe(FALLBACK_STEPS_PER_LINE)

      expect(
        calcStepsPerLine({
          availableWidth: Number.NaN,
          cellWidth: 36,
          stepsPerBeat: 2,
          maxStepsPerLine: 64,
        }),
      ).toBe(FALLBACK_STEPS_PER_LINE)
    })
  })

  describe("splitStepsIntoLines", () => {
    test("段ごとにステップを分割する", () => {
      const lines = splitStepsIntoLines(10, 4)

      expect(lines).toHaveLength(3)
      expect(lines[0]).toEqual({
        index: 0,
        startStep: 0,
        steps: [0, 1, 2, 3],
      })
      expect(lines[2]).toEqual({ index: 2, startStep: 8, steps: [8, 9] })
    })

    test("1段に収まる場合は1段だけ返す", () => {
      expect(splitStepsIntoLines(4, 16)).toHaveLength(1)
    })

    test("長さが0なら段は無い", () => {
      expect(splitStepsIntoLines(0, 16)).toEqual([])
    })

    test("段あたり0ステップでも無限ループしない", () => {
      expect(splitStepsIntoLines(2, 0)).toHaveLength(2)
    })
  })
})
