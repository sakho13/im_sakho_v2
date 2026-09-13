import { validateKanteleScore } from "@/lib/functions/kantele/validateKanteleScore"
import { KANTELE_TUNING_PRESETS } from "@/statics/data/kantele-notes"

const FIVE_STRING_TUNING = KANTELE_TUNING_PRESETS.find(
  (preset) => preset.id === "5-major",
)!.tuning
const FIFTEEN_STRING_TUNING = KANTELE_TUNING_PRESETS.find(
  (preset) => preset.id === "15-diatonic",
)!.tuning

function buildValidScore(overrides: Record<string, unknown> = {}) {
  return {
    version: 1,
    title: "テスト譜面",
    bpm: 100,
    stepsPerBeat: 2,
    length: 16,
    tuning: [...FIVE_STRING_TUNING],
    notes: [{ string: 0, step: 0 }],
    ...overrides,
  }
}

describe("lib/functions/kantele/validateKanteleScore", () => {
  test("正常系(5弦)はそのまま通る", () => {
    const score = buildValidScore()
    expect(validateKanteleScore(score)).toEqual(score)
  })

  test("正常系(15弦)はそのまま通る", () => {
    const score = buildValidScore({ tuning: [...FIFTEEN_STRING_TUNING] })
    expect(validateKanteleScore(score)).toEqual(score)
  })

  test("titleが無くてもデフォルト値で通る", () => {
    const score = buildValidScore()
    delete (score as Record<string, unknown>).title
    expect(validateKanteleScore(score).title).toBe("無題のタブ譜")
  })

  test("非オブジェクトはthrow", () => {
    expect(() => validateKanteleScore(null)).toThrow()
    expect(() => validateKanteleScore("invalid")).toThrow()
    expect(() => validateKanteleScore([])).toThrow()
  })

  test("versionが不一致だとthrow", () => {
    expect(() => validateKanteleScore(buildValidScore({ version: 2 }))).toThrow()
  })

  test("tuningが0要素だとthrow", () => {
    expect(() => validateKanteleScore(buildValidScore({ tuning: [] }))).toThrow()
  })

  test("tuningが41要素だとthrow", () => {
    expect(() =>
      validateKanteleScore(
        buildValidScore({ tuning: Array(41).fill("C4") }),
      ),
    ).toThrow()
  })

  test("tuningに不正な音名が含まれるとthrow", () => {
    expect(() =>
      validateKanteleScore(buildValidScore({ tuning: ["invalid"] })),
    ).toThrow()
  })

  test("noteのstringが範囲外だとthrow", () => {
    expect(() =>
      validateKanteleScore(
        buildValidScore({ notes: [{ string: 5, step: 0 }] }),
      ),
    ).toThrow()
  })

  test("noteのstepが範囲外だとthrow", () => {
    expect(() =>
      validateKanteleScore(
        buildValidScore({ notes: [{ string: 0, step: 16 }] }),
      ),
    ).toThrow()
  })
})
