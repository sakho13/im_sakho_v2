import { KanteleScore } from "@/types/kantele"
import { validateKanteleScore } from "./validateKanteleScore"

const AUTOSAVE_STORAGE_KEY = "kantele-tab:autosave:v1"

export function loadAutosavedScore(): KanteleScore | null {
  try {
    const raw = window.localStorage.getItem(AUTOSAVE_STORAGE_KEY)
    if (!raw) return null

    return validateKanteleScore(JSON.parse(raw))
  } catch {
    return null
  }
}

export function saveAutosavedScore(score: KanteleScore): void {
  try {
    window.localStorage.setItem(AUTOSAVE_STORAGE_KEY, JSON.stringify(score))
  } catch {
    // ストレージが使用できない場合は何もしない(プライベートブラウジング・容量超過等)
  }
}

export function clearAutosavedScore(): void {
  try {
    window.localStorage.removeItem(AUTOSAVE_STORAGE_KEY)
  } catch {
    // 何もしない
  }
}
