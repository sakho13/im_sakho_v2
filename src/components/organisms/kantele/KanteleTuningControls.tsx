"use client"

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

type Props = {
  tuning: string[]
  onChangeNote: (index: number, note: string) => void
  onAddString: () => void
  onRemoveString: (index: number) => void
  onApplyPreset: (presetId: string) => void
}

export function KanteleTuningControls({
  tuning,
  onChangeNote,
  onAddString,
  onRemoveString,
  onApplyPreset,
}: Props) {
  return (
    <div className='grid gap-2'>
      <div className='flex flex-wrap gap-2'>
        {tuning.map((note, index) => (
          <Select
            key={index}
            value={note}
            onValueChange={(value) => onChangeNote(index, value)}
          >
            <SelectTrigger className='w-24'>
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
        ))}
      </div>

      <div className='flex flex-wrap items-center gap-2'>
        <Button type='button' variant='outline' size='sm' onClick={onAddString}>
          + 弦を追加
        </Button>
        <Button
          type='button'
          variant='outline'
          size='sm'
          disabled={tuning.length <= 1}
          onClick={() => onRemoveString(tuning.length - 1)}
        >
          − 最後の弦を削除
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
