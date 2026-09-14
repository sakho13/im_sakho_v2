import {
  DEFAULT_VIEW_PREFS,
  loadViewPrefs,
  saveViewPrefs,
} from "@/lib/functions/kantele/kanteleViewPrefs"

describe("lib/functions/kantele/kanteleViewPrefs", () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  test("保存前はデフォルト設定が返る", () => {
    expect(loadViewPrefs()).toEqual(DEFAULT_VIEW_PREFS)
  })

  test("保存した並び順を読み込める", () => {
    saveViewPrefs({ stringOrder: "bassTop" })
    expect(loadViewPrefs()).toEqual({ stringOrder: "bassTop" })
  })

  test("壊れたJSONの場合はデフォルト設定が返る", () => {
    window.localStorage.setItem("kantele-tab:view:v1", "{invalid json")
    expect(loadViewPrefs()).toEqual(DEFAULT_VIEW_PREFS)
  })

  test("未知の並び順が保存されていた場合はデフォルト設定が返る", () => {
    window.localStorage.setItem(
      "kantele-tab:view:v1",
      JSON.stringify({ stringOrder: "unknown" }),
    )
    expect(loadViewPrefs()).toEqual(DEFAULT_VIEW_PREFS)
  })
})
