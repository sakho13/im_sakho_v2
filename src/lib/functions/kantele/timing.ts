export function stepDurationSeconds(bpm: number, stepsPerBeat: number): number {
  return 60 / bpm / stepsPerBeat
}

export function stepIndexAtElapsed(elapsedSeconds: number, stepDuration: number): number {
  return Math.floor(elapsedSeconds / stepDuration)
}
