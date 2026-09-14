export type KanteleGridLine = {
  index: number // 段番号(0始まり)
  startStep: number
  steps: number[]
}

// 表示幅を測れていないとき(SSR・初回レンダリング)に使う暫定値。
export const FALLBACK_STEPS_PER_LINE = 16

// 1段に何ステップ収めるかを表示幅から求める。
// 拍の途中で折り返すと読みづらいため、1拍単位に切り下げる。
export function calcStepsPerLine({
  availableWidth,
  cellWidth,
  stepsPerBeat,
  maxStepsPerLine,
}: {
  availableWidth: number
  cellWidth: number
  stepsPerBeat: number
  maxStepsPerLine: number
}): number {
  const beatSteps = Math.max(1, Math.floor(stepsPerBeat))
  const cap = Math.max(1, Math.floor(maxStepsPerLine))

  if (
    !Number.isFinite(availableWidth) ||
    availableWidth <= 0 ||
    cellWidth <= 0
  ) {
    return Math.min(FALLBACK_STEPS_PER_LINE, cap)
  }

  const cells = Math.floor(availableWidth / cellWidth)
  const beats = Math.max(1, Math.floor(cells / beatSteps))

  return Math.min(beats * beatSteps, cap)
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
