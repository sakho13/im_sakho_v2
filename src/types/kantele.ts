export const KANTELE_SCORE_VERSION = 1 as const

export type KanteleNote = {
  string: number // tuning配列のindex(0始まり。弦数は可変)
  step: number // 0-indexed の時間ステップ
}

export type KanteleScore = {
  version: typeof KANTELE_SCORE_VERSION
  title: string
  bpm: number // 20-300
  stepsPerBeat: number // グリッド解像度(例: 2 = 8分音符単位)
  length: number // 総ステップ数(列数)
  tuning: string[] // 弦の本数ぶんの音名配列。長さは可変(5弦なら5要素、15弦なら15要素)
  notes: KanteleNote[] // 単発のはじき音イベント(duration無し)
}
