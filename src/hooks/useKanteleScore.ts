import { useCallback, useEffect, useState } from "react"
import { toast } from "sonner"
import { KanteleScore } from "@/types/kantele"
import { createDefaultKanteleScore } from "@/lib/functions/kantele/createDefaultKanteleScore"
import {
  dumpKanteleScoreToYaml,
  parseKanteleScoreFromYaml,
} from "@/lib/functions/kantele/kanteleScoreYaml"
import { transposeNoteName } from "@/lib/functions/kantele/noteFrequency"
import {
  clearAutosavedScore,
  loadAutosavedScore,
  saveAutosavedScore,
} from "@/lib/functions/kantele/kanteleAutosave"
import {
  KANTELE_TUNING_PRESETS,
  NOTE_NAME_OPTIONS,
} from "@/statics/data/kantele-notes"

function findTuningPreset(presetId: string) {
  const preset = KANTELE_TUNING_PRESETS.find((p) => p.id === presetId)
  if (!preset) {
    throw new Error(`不明なプリセットです: ${presetId}`)
  }
  return preset
}

export function useKanteleScore() {
  const [score, setScore] = useState<KanteleScore>(createDefaultKanteleScore)

  useEffect(() => {
    const autosaved = loadAutosavedScore()
    if (autosaved) {
      setScore(autosaved)
    }
  }, [])

  useEffect(() => {
    saveAutosavedScore(score)
  }, [score])

  const toggleNote = useCallback((string: number, step: number) => {
    setScore((prev) => {
      const exists = prev.notes.some(
        (note) => note.string === string && note.step === step,
      )

      return {
        ...prev,
        notes: exists
          ? prev.notes.filter(
              (note) => !(note.string === string && note.step === step),
            )
          : [...prev.notes, { string, step }],
      }
    })
  }, [])

  const setTuningNote = useCallback((index: number, note: string) => {
    setScore((prev) => {
      const tuning = [...prev.tuning]
      tuning[index] = note
      return { ...prev, tuning }
    })
  }, [])

  const addString = useCallback(() => {
    setScore((prev) => {
      const lastNote = prev.tuning[prev.tuning.length - 1] ?? NOTE_NAME_OPTIONS[0]
      const nextNote = transposeNoteName(lastNote, 2)
      return { ...prev, tuning: [...prev.tuning, nextNote] }
    })
  }, [])

  const removeString = useCallback((index: number) => {
    setScore((prev) => {
      if (prev.tuning.length <= 1) return prev

      return {
        ...prev,
        tuning: prev.tuning.filter((_, i) => i !== index),
        notes: prev.notes
          .filter((note) => note.string !== index)
          .map((note) =>
            note.string > index ? { ...note, string: note.string - 1 } : note,
          ),
      }
    })
  }, [])

  const applyTuningPreset = useCallback((presetId: string) => {
    setScore((prev) => {
      const tuning = [...findTuningPreset(presetId).tuning]
      return {
        ...prev,
        tuning,
        notes: prev.notes.filter((note) => note.string < tuning.length),
      }
    })
  }, [])

  const setBpm = useCallback((bpm: number) => {
    setScore((prev) => ({ ...prev, bpm }))
  }, [])

  const setStepsPerBeat = useCallback((stepsPerBeat: number) => {
    setScore((prev) => ({ ...prev, stepsPerBeat }))
  }, [])

  const setLength = useCallback((length: number) => {
    setScore((prev) => ({
      ...prev,
      length,
      notes: prev.notes.filter((note) => note.step < length),
    }))
  }, [])

  const setTitle = useCallback((title: string) => {
    setScore((prev) => ({ ...prev, title }))
  }, [])

  const exportYaml = useCallback(() => {
    return dumpKanteleScoreToYaml(score)
  }, [score])

  const importYaml = useCallback((text: string) => {
    try {
      const imported = parseKanteleScoreFromYaml(text)
      setScore(imported)
      toast.success("譜面を読み込みました")
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "読み込みに失敗しました",
      )
    }
  }, [])

  const reset = useCallback(() => {
    clearAutosavedScore()
    setScore(createDefaultKanteleScore())
  }, [])

  return {
    score,
    toggleNote,
    setTuningNote,
    addString,
    removeString,
    applyTuningPreset,
    setBpm,
    setStepsPerBeat,
    setLength,
    setTitle,
    exportYaml,
    importYaml,
    reset,
  }
}
