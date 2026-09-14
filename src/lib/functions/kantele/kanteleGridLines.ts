export type KanteleGridLine = {
  index: number // 段番号(0始まり)
  startStep: number
  steps: number[]
}

// 表示幅を測れていないとき(SSR・初回レンダリング)に使う暫定値。
export const FALLBACK_STEPS_PER_LINE = 16

// 1段に何ステップ収めるかを表示幅から求める。
// 小節の途中で折り返すと読みづらいため、1小節まるごと入るなら小節単位、
// 入らない場合は1拍単位に切り下げる。
export function calcStepsPerLine({
  availableWidth,
  cellWidth,
  stepsPerBeat,
  beatsPerMeasure,
  maxStepsPerLine,
}: {
  availableWidth: number
  cellWidth: number
  stepsPerBeat: number
  beatsPerMeasure: number
  maxStepsPerLine: number
}): number {
  const beatSteps = Math.max(1, Math.floor(stepsPerBeat))
  const measureSteps = beatSteps * Math.max(1, Math.floor(beatsPerMeasure))
  const cap = Math.max(1, Math.floor(maxStepsPerLine))

  if (
    !Number.isFinite(availableWidth) ||
    availableWidth <= 0 ||
    cellWidth <= 0
  ) {
    return Math.min(FALLBACK_STEPS_PER_LINE, cap)
  }

  const cells = Math.floor(availableWidth / cellWidth)

  if (cells >= measureSteps) {
    const measures = Math.max(1, Math.floor(cells / measureSteps))
    return Math.min(measures * measureSteps, cap)
  }

  const beats = Math.max(1, Math.floor(cells / beatSteps))
  return Math.min(beats * beatSteps, cap)
}

// 小節内での拍番号(1始まり)を返す。拍の開始ステップでなければnull。
// 例: 3拍子なら 1,2,3,1,2,3... と小節ごとに数え直す。
export function beatNumberInMeasure(
  step: number,
  stepsPerBeat: number,
  beatsPerMeasure: number,
): number | null {
  const beatSteps = Math.max(1, Math.floor(stepsPerBeat))
  if (step % beatSteps !== 0) return null

  const measureBeats = Math.max(1, Math.floor(beatsPerMeasure))
  const beatIndex = Math.floor(step / beatSteps) % measureBeats
  return beatIndex + 1
}

// 小節の先頭ステップかどうか(小節線を引く位置の判定に使う)。
export function isMeasureStart(
  step: number,
  stepsPerBeat: number,
  beatsPerMeasure: number,
): boolean {
  return beatNumberInMeasure(step, stepsPerBeat, beatsPerMeasure) === 1
}

// 譜面全体を段(折り返し行)に分割する。
export function splitStepsIntoLines(
  length: number,
  stepsPerLine: number,
): KanteleGridLine[] {
  const size = Math.max(1, Math.floor(stepsPerLine))
  const lines: KanteleGridLine[] = []

  for (let start = 0; start < length; start += size) {
    const steps = Math.min(size, length - start)
    lines.push({
      index: lines.length,
      startStep: start,
      steps: Array.from({ length: steps }, (_, i) => start + i),
    })
  }

  return lines
}
