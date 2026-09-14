import {
  beatNumberInMeasure,
  calcStepsPerLine,
  FALLBACK_STEPS_PER_LINE,
  isMeasureStart,
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
          beatsPerMeasure: 1,
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
          beatsPerMeasure: 1,
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
          beatsPerMeasure: 1,
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
          beatsPerMeasure: 1,
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
          beatsPerMeasure: 1,
          maxStepsPerLine: 64,
        }),
      ).toBe(FALLBACK_STEPS_PER_LINE)

      expect(
        calcStepsPerLine({
          availableWidth: Number.NaN,
          cellWidth: 36,
          stepsPerBeat: 2,
          beatsPerMeasure: 1,
          maxStepsPerLine: 64,
        }),
      ).toBe(FALLBACK_STEPS_PER_LINE)
    })

    test("1小節まるごと入るなら小節単位で折り返す(3拍子・2ステップ/拍=6ステップ/小節)", () => {
      // 442px / 36px = 12マス → 2小節ぶん(12ステップ)
      expect(
        calcStepsPerLine({
          availableWidth: 442,
          cellWidth: 36,
          stepsPerBeat: 2,
          beatsPerMeasure: 3,
          maxStepsPerLine: 64,
        }),
      ).toBe(12)
    })

    test("小節がまるごと入らない場合は拍単位に切り下げる", () => {
      // 190px / 36px = 5マス。6ステップ/小節に届かないので拍(2ステップ)単位で2拍ぶん
      expect(
        calcStepsPerLine({
          availableWidth: 190,
          cellWidth: 36,
          stepsPerBeat: 2,
          beatsPerMeasure: 3,
          maxStepsPerLine: 64,
        }),
      ).toBe(4)
    })
  })

  describe("beatNumberInMeasure", () => {
    test("3拍子(2ステップ/拍)なら 1,2,3,1,2,3... と数え直す", () => {
      expect(beatNumberInMeasure(0, 2, 3)).toBe(1)
      expect(beatNumberInMeasure(2, 2, 3)).toBe(2)
      expect(beatNumberInMeasure(4, 2, 3)).toBe(3)
      expect(beatNumberInMeasure(6, 2, 3)).toBe(1)
    })

    test("拍の開始ステップでなければnull", () => {
      expect(beatNumberInMeasure(1, 2, 3)).toBeNull()
      expect(beatNumberInMeasure(3, 2, 3)).toBeNull()
    })
  })

  describe("isMeasureStart", () => {
    test("小節の先頭ステップだけtrue", () => {
      expect(isMeasureStart(0, 2, 3)).toBe(true)
      expect(isMeasureStart(6, 2, 3)).toBe(true)
      expect(isMeasureStart(2, 2, 3)).toBe(false)
      expect(isMeasureStart(4, 2, 3)).toBe(false)
      expect(isMeasureStart(1, 2, 3)).toBe(false)
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
