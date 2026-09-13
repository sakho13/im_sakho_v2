import {
  clearAutosavedScore,
  loadAutosavedScore,
  saveAutosavedScore,
} from "@/lib/functions/kantele/kanteleAutosave"
import { createDefaultKanteleScore } from "@/lib/functions/kantele/createDefaultKanteleScore"

describe("lib/functions/kantele/kanteleAutosave", () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  test("保存前は null が返る", () => {
    expect(loadAutosavedScore()).toBeNull()
  })

  test("保存した内容を読み込める", () => {
    const score = createDefaultKanteleScore()
    saveAutosavedScore(score)
    expect(loadAutosavedScore()).toEqual(score)
  })

  test("clearAutosavedScore後はnullが返る", () => {
    saveAutosavedScore(createDefaultKanteleScore())
    clearAutosavedScore()
    expect(loadAutosavedScore()).toBeNull()
  })

  test("壊れたJSONの場合はnullが返る", () => {
    window.localStorage.setItem("kantele-tab:autosave:v1", "{invalid json")
    expect(loadAutosavedScore()).toBeNull()
  })

  test("スキーマが不正な場合はnullが返る", () => {
    window.localStorage.setItem(
      "kantele-tab:autosave:v1",
      JSON.stringify({ version: 999 }),
    )
    expect(loadAutosavedScore()).toBeNull()
  })
})
