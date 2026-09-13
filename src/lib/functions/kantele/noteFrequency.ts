const NOTE_LETTER_SEMITONES: Record<string, number> = {
  C: 0,
  D: 2,
  E: 4,
  F: 5,
  G: 7,
  A: 9,
  B: 11,
}

const SHARP_NOTE_NAMES = [
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

const NOTE_NAME_PATTERN = /^([A-Ga-g])(#|b)?(-?\d+)$/

function parseNoteName(note: string): { semitoneFromC: number; octave: number } {
  const match = NOTE_NAME_PATTERN.exec(note.trim())
  if (!match) {
    throw new Error(`不正な音名です: ${note}`)
  }

  const [, letter, accidental, octaveText] = match
  const baseSemitone = NOTE_LETTER_SEMITONES[letter.toUpperCase()]
  const accidentalOffset = accidental === "#" ? 1 : accidental === "b" ? -1 : 0

  return {
    semitoneFromC: baseSemitone + accidentalOffset,
    octave: Number(octaveText),
  }
}

function toAbsoluteSemitone(note: string): number {
  const { semitoneFromC, octave } = parseNoteName(note)
  return octave * 12 + semitoneFromC
}

function fromAbsoluteSemitone(absoluteSemitone: number): string {
  const octave = Math.floor(absoluteSemitone / 12)
  const semitoneFromC = ((absoluteSemitone % 12) + 12) % 12
  return `${SHARP_NOTE_NAMES[semitoneFromC]}${octave}`
}

export function noteNameToFrequency(note: string): number {
  const absoluteSemitone = toAbsoluteSemitone(note)
  const semitonesFromA4 = absoluteSemitone - toAbsoluteSemitone("A4")
  return 440 * Math.pow(2, semitonesFromA4 / 12)
}

export function transposeNoteName(note: string, semitones: number): string {
  return fromAbsoluteSemitone(toAbsoluteSemitone(note) + semitones)
}
