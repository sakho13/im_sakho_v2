const CHROMATIC_NOTE_NAMES = [
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#",
  "A",
  "A#",
  "B",
]

// C2〜C7 の半音階。15弦カンテレでも音域が足りるよう5弦時より広めに用意する。
export const NOTE_NAME_OPTIONS: string[] = (() => {
  const options: string[] = []
  for (let octave = 2; octave <= 7; octave++) {
    for (const name of CHROMATIC_NOTE_NAMES) {
      if (octave === 7 && name !== "C") break
      options.push(`${name}${octave}`)
    }
  }
  return options
})()

export type KanteleTuningPreset = {
  id: string
  label: string
  tuning: string[]
}

// 5弦カンテレの一般的な調弦(メーカーの説明書記載の例: D E F#/F G A)と、
// 15弦相当の暫定プリセット。いずれもユーザーが後から自由に変更可能。
export const KANTELE_TUNING_PRESETS: KanteleTuningPreset[] = [
  {
    id: "5-major",
    label: "5弦(メジャー)",
    tuning: ["D4", "E4", "F#4", "G4", "A4"],
  },
  {
    id: "5-minor",
    label: "5弦(マイナー)",
    tuning: ["D4", "E4", "F4", "G4", "A4"],
  },
  {
    id: "15-diatonic",
    label: "15弦",
    tuning: [
      "C3",
      "D3",
      "E3",
      "F3",
      "G3",
      "A3",
      "B3",
      "C4",
      "D4",
      "E4",
      "F4",
      "G4",
      "A4",
      "B4",
      "C5",
    ], // ダイアトニックな2オクターブ+1の暫定デフォルト。ユーザーが自由に変更可能
  },
]

export const DEFAULT_TUNING_PRESET_ID = "5-major"
