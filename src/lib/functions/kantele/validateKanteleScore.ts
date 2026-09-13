import { KANTELE_SCORE_VERSION, KanteleScore } from "@/types/kantele"
import { NOTE_NAME_OPTIONS } from "@/statics/data/kantele-notes"

const MIN_STRING_COUNT = 1
const MAX_STRING_COUNT = 40
const MIN_BPM = 20
const MAX_BPM = 300
const MIN_STEPS_PER_BEAT = 1
const MAX_STEPS_PER_BEAT = 8
const MIN_LENGTH = 1
const MAX_LENGTH = 512

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value)
}

function isFiniteNumberInRange(
  value: unknown,
  min: number,
  max: number,
): value is number {
  return typeof value === "number" && Number.isFinite(value) && value >= min && value <= max
}

function isIntegerInRange(
  value: unknown,
  min: number,
  max: number,
): value is number {
  return typeof value === "number" && Number.isInteger(value) && value >= min && value <= max
}

export function validateKanteleScore(data: unknown): KanteleScore {
  if (!isPlainObject(data)) {
    throw new Error("譜面データの形式が不正です")
  }

  if (data.version !== KANTELE_SCORE_VERSION) {
    throw new Error(`対応していないバージョンです: ${String(data.version)}`)
  }

  const tuning = data.tuning
  if (
    !Array.isArray(tuning) ||
    tuning.length < MIN_STRING_COUNT ||
    tuning.length > MAX_STRING_COUNT ||
    !tuning.every((note) => typeof note === "string" && NOTE_NAME_OPTIONS.includes(note))
  ) {
    throw new Error("tuning(調弦)の指定が不正です")
  }

  if (!isFiniteNumberInRange(data.bpm, MIN_BPM, MAX_BPM)) {
    throw new Error(`bpm は ${MIN_BPM}〜${MAX_BPM} の範囲で指定してください`)
  }

  if (!isIntegerInRange(data.stepsPerBeat, MIN_STEPS_PER_BEAT, MAX_STEPS_PER_BEAT)) {
    throw new Error(
      `stepsPerBeat は ${MIN_STEPS_PER_BEAT}〜${MAX_STEPS_PER_BEAT} の整数で指定してください`,
    )
  }

  if (!isIntegerInRange(data.length, MIN_LENGTH, MAX_LENGTH)) {
    throw new Error(`length は ${MIN_LENGTH}〜${MAX_LENGTH} の整数で指定してください`)
  }

  const length = data.length
  const notes = data.notes
  if (!Array.isArray(notes)) {
    throw new Error("notes の形式が不正です")
  }

  for (const note of notes) {
    if (
      !isPlainObject(note) ||
      !isIntegerInRange(note.string, 0, tuning.length - 1) ||
      !isIntegerInRange(note.step, 0, length - 1)
    ) {
      throw new Error("notes の内容が不正です")
    }
  }

  const title = typeof data.title === "string" ? data.title : "無題のタブ譜"

  return {
    version: KANTELE_SCORE_VERSION,
    title,
    bpm: data.bpm,
    stepsPerBeat: data.stepsPerBeat,
    length,
    tuning: tuning as string[],
    notes: notes as KanteleScore["notes"],
  }
}
