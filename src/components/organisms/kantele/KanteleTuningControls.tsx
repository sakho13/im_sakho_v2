"use client"

import { ArrowUpDownIcon, Trash2Icon } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  KANTELE_TUNING_PRESETS,
  NOTE_NAME_OPTIONS,
} from "@/statics/data/kantele-notes"
import { scaleDegreeLabel } from "@/lib/functions/kantele/scaleDegree"
import {
  KanteleStringOrder,
  orderedStringIndexes,
  STRING_ORDER_LABELS,
  stringNumberLabel,
} from "@/lib/functions/kantele/kanteleStringLayout"

type Props = {
  tuning: string[]
  stringOrder: KanteleStringOrder
  onChangeNote: (index: number, note: string) => void
  onAddString: () => void
  onRemoveString: (index: number) => void
  onApplyPreset: (presetId: string) => void
  onToggleStringOrder: () => void
}

export function KanteleTuningControls({
  tuning,
  stringOrder,
  onChangeNote,
  onAddString,
  onRemoveString,
  onApplyPreset,
  onToggleStringOrder,
}: Props) {
  const stringIndexes = orderedStringIndexes(tuning.length, stringOrder)

  return (
    <div className='grid gap-3'>
      <div className='flex flex-wrap items-center gap-2'>
        <span className='text-sm text-muted-foreground'>
          弦の並び: {STRING_ORDER_LABELS[stringOrder]}
        </span>
        <Button
          type='button'
          variant='outline'
          size='sm'
          onClick={onToggleStringOrder}
        >
          <ArrowUpDownIcon />
          <span>上下を入れ替える</span>
        </Button>
        <span className='text-xs text-muted-foreground'>
          実機を手元に置いたときの弦の並びに合わせてください。
        </span>
      </div>

      <div className='grid grid-cols-[repeat(auto-fill,minmax(10rem,1fr))] gap-2'>
        {stringIndexes.map((index) => (
          <div
            key={index}
            className='flex items-center gap-2 rounded-md border p-2'
          >
            <div className='flex w-8 shrink-0 flex-col items-center leading-none'>
              <span className='flex size-6 items-center justify-center rounded-full border text-xs font-bold'>
                {index + 1}
              </span>
              <span className='pt-1 text-[10px] text-muted-foreground'>
                {scaleDegreeLabel(index)}
              </span>
            </div>

            <Select
              value={tuning[index]}
              onValueChange={(value) => onChangeNote(index, value)}
            >
              <SelectTrigger
                className='min-w-0 flex-1'
                aria-label={`${stringNumberLabel(index)}の音`}
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {NOTE_NAME_OPTIONS.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button
              type='button'
              variant='ghost'
              size='icon'
              className='size-8 shrink-0'
              aria-label={`${stringNumberLabel(index)}を削除`}
              disabled={tuning.length <= 1}
              onClick={() => {
                if (
                  window.confirm(
                    `${stringNumberLabel(index)}を削除します。この弦に置いたノートも消えます。よろしいですか?`,
                  )
                ) {
                  onRemoveString(index)
                }
              }}
            >
              <Trash2Icon />
            </Button>
          </div>
        ))}
      </div>

      <div className='flex flex-wrap items-center gap-2'>
        <Button type='button' variant='outline' size='sm' onClick={onAddString}>
          + 弦を追加
        </Button>

        <span className='mx-2 text-sm text-muted-foreground'>プリセット:</span>
        {KANTELE_TUNING_PRESETS.map((preset) => (
          <Button
            key={preset.id}
            type='button'
            variant='secondary'
            size='sm'
            onClick={() => {
              if (
                window.confirm(
                  `調弦を「${preset.label}」に置き換えます。範囲外の弦にあるノートは削除されます。よろしいですか?`,
                )
              ) {
                onApplyPreset(preset.id)
              }
            }}
          >
            {preset.label}
          </Button>
        ))}
      </div>
    </div>
  )
}
