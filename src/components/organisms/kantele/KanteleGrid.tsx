"use client"

import { useMemo } from "react"
import { cn } from "@/lib/utils"
import { KanteleNote } from "@/types/kantele"
import { useElementWidth } from "@/hooks/useElementWidth"
import {
  calcStepsPerLine,
  splitStepsIntoLines,
} from "@/lib/functions/kantele/kanteleGridLines"
import {
  KanteleStringOrder,
  orderedStringIndexes,
  stringNumberLabel,
} from "@/lib/functions/kantele/kanteleStringLayout"

const CELL_WIDTH = 36
const STRING_HEADER_WIDTH = 76

type Props = {
  tuning: string[]
  length: number
  stepsPerBeat: number
  notes: KanteleNote[]
  currentStep: number | null
  stringOrder: KanteleStringOrder
  onToggleNote: (string: number, step: number) => void
}

export function KanteleGrid({
  tuning,
  length,
  stepsPerBeat,
  notes,
  currentStep,
  stringOrder,
  onToggleNote,
}: Props) {
  const { ref, width } = useElementWidth<HTMLDivElement>()

  const activeCells = useMemo(
    () => new Set(notes.map((note) => `${note.step}:${note.string}`)),
    [notes],
  )

  // 上から下へ描画する弦の順番(実機の並びに合わせて反転できる)
  const stringIndexes = useMemo(
    () => orderedStringIndexes(tuning.length, stringOrder),
    [tuning.length, stringOrder],
  )

  // 1行に詰め込まず、表示幅に収まるところで段に折り返す
  const lines = useMemo(() => {
    const stepsPerLine = calcStepsPerLine({
      availableWidth: width - STRING_HEADER_WIDTH,
      cellWidth: CELL_WIDTH,
      stepsPerBeat,
      maxStepsPerLine: length,
    })
    return splitStepsIntoLines(length, stepsPerLine)
  }, [width, stepsPerBeat, length])

  return (
    <div ref={ref} className='min-w-0 space-y-3'>
      {lines.map((line) => (
        <div key={line.index} className='overflow-x-auto rounded-md border'>
          <div className='inline-block min-w-full select-none'>
            <div className='flex bg-muted/40'>
              <div
                className='shrink-0 px-2 py-1 text-[10px] text-muted-foreground'
                style={{ width: STRING_HEADER_WIDTH }}
              >
                {line.index + 1}段目
              </div>
              {line.steps.map((step) => {
                const isBeatStart = step % stepsPerBeat === 0

                return (
                  <div
                    key={step}
                    className={cn(
                      "shrink-0 py-1 text-center text-[10px] text-muted-foreground",
                      isBeatStart && "font-bold text-foreground",
                    )}
                    style={{ width: CELL_WIDTH }}
                  >
                    {isBeatStart ? step / stepsPerBeat + 1 : ""}
                  </div>
                )
              })}
            </div>

            {stringIndexes.map((stringIndex) => (
              <div key={stringIndex} className='flex'>
                <div
                  className='flex h-9 shrink-0 items-center gap-2 border-t bg-background px-2'
                  style={{ width: STRING_HEADER_WIDTH }}
                >
                  <span className='flex size-5 shrink-0 items-center justify-center rounded-full border text-[10px] font-bold'>
                    {stringIndex + 1}
                  </span>
                  <span className='truncate text-xs text-muted-foreground'>
                    {tuning[stringIndex]}
                  </span>
                </div>

                {line.steps.map((step) => {
                  const isActive = activeCells.has(`${step}:${stringIndex}`)
                  const isCurrent = step === currentStep
                  const isBeatStart = step % stepsPerBeat === 0

                  return (
                    <button
                      key={step}
                      type='button'
                      onClick={() => onToggleNote(stringIndex, step)}
                      aria-pressed={isActive}
                      aria-label={`${stringNumberLabel(stringIndex)}(${tuning[stringIndex]}) / ${step + 1}ステップ目`}
                      className={cn(
                        "relative h-9 shrink-0 border-l border-t border-l-border/50 transition-colors hover:bg-accent",
                        isBeatStart && "border-l-2 border-l-foreground/30",
                        isCurrent && "bg-accent",
                      )}
                      style={{ width: CELL_WIDTH }}
                    >
                      {/* 弦そのものを表す横線。マス目ではなく弦の上に音を置く見た目にする */}
                      <span className='pointer-events-none absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-border' />
                      {isActive && (
                        <span className='pointer-events-none absolute left-1/2 top-1/2 size-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary' />
                      )}
                    </button>
                  )
                })}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
