import { KANTELE_SCORE_VERSION, KanteleScore } from "@/types/kantele"
import {
  DEFAULT_TUNING_PRESET_ID,
  KANTELE_TUNING_PRESETS,
} from "@/statics/data/kantele-notes"

export function createDefaultKanteleScore(): KanteleScore {
  const defaultPreset = KANTELE_TUNING_PRESETS.find(
    (preset) => preset.id === DEFAULT_TUNING_PRESET_ID,
  )

  return {
    version: KANTELE_SCORE_VERSION,
    title: "無題のタブ譜",
    bpm: 100,
    stepsPerBeat: 2,
    length: 16,
    tuning: [...(defaultPreset?.tuning ?? KANTELE_TUNING_PRESETS[0].tuning)],
    notes: [],
  }
}
