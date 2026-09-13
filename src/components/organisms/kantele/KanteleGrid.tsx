"use client"

import { useMemo } from "react"
import { cn } from "@/lib/utils"
import { KanteleNote } from "@/types/kantele"
import { scaleDegreeLabel } from "@/lib/functions/kantele/scaleDegree"

type Props = {
  tuning: string[]
  length: number
  stepsPerBeat: number
  notes: KanteleNote[]
  currentStep: number | null
  onToggleNote: (string: number, step: number) => void
}

export function KanteleGrid({
  tuning,
  length,
  stepsPerBeat,
  notes,
  currentStep,
  onToggleNote,
}: Props) {
  const activeCells = useMemo(
    () => new Set(notes.map((note) => `${note.step}:${note.string}`)),
    [notes],
  )

  const steps = useMemo(() => Array.from({ length }, (_, i) => i), [length])

  return (
    <div className='min-w-0 overflow-x-auto rounded-md border'>
      <div className='inline-block min-w-full select-none'>
        {tuning.map((note, stringIndex) => (
          <div key={stringIndex} className='flex'>
            <div className='sticky left-0 z-10 flex h-9 w-14 shrink-0 flex-col items-center justify-center border-b border-r bg-background text-xs font-medium leading-tight'>
              <span>{note}</span>
              <span className='text-[10px] text-muted-foreground'>
                {scaleDegreeLabel(stringIndex)}
              </span>
            </div>
            {steps.map((step) => {
              const isActive = activeCells.has(`${step}:${stringIndex}`)
              const isCurrent = step === currentStep
              const isBeatStart = step % stepsPerBeat === 0

              return (
                <button
                  key={step}
                  type='button'
                  onClick={() => onToggleNote(stringIndex, step)}
                  aria-pressed={isActive}
                  aria-label={`${note} / step ${step + 1}`}
                  className={cn(
                    "h-9 w-9 shrink-0 border-b border-r transition-colors",
                    isBeatStart && "border-l-2 border-l-foreground/30",
                    isActive
                      ? "bg-primary hover:bg-primary/90"
                      : "bg-muted hover:bg-accent",
                    isCurrent && "ring-2 ring-inset ring-ring",
                  )}
                />
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}
