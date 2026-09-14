import {
  DEFAULT_STRING_ORDER,
  isKanteleStringOrder,
  KanteleStringOrder,
} from "./kanteleStringLayout"

const VIEW_PREFS_STORAGE_KEY = "kantele-tab:view:v1"

export type KanteleViewPrefs = {
  stringOrder: KanteleStringOrder
}

export const DEFAULT_VIEW_PREFS: KanteleViewPrefs = {
  stringOrder: DEFAULT_STRING_ORDER,
}

export function loadViewPrefs(): KanteleViewPrefs {
  try {
    const raw = window.localStorage.getItem(VIEW_PREFS_STORAGE_KEY)
    if (!raw) return DEFAULT_VIEW_PREFS

    const parsed: unknown = JSON.parse(raw)
    const stringOrder =
      typeof parsed === "object" && parsed !== null
        ? (parsed as Record<string, unknown>).stringOrder
        : undefined

    return {
      stringOrder: isKanteleStringOrder(stringOrder)
        ? stringOrder
        : DEFAULT_STRING_ORDER,
    }
  } catch {
    return DEFAULT_VIEW_PREFS
  }
}

export function saveViewPrefs(prefs: KanteleViewPrefs): void {
  try {
    window.localStorage.setItem(VIEW_PREFS_STORAGE_KEY, JSON.stringify(prefs))
  } catch {
    // ストレージが使用できない場合は何もしない(プライベートブラウジング・容量超過等)
  }
}
