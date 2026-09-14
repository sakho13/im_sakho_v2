"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  KanteleStringOrder,
  orderedStringIndexes,
  stringNumberLabel,
} from "@/lib/functions/kantele/kanteleStringLayout"

type Props = {
  tuning: string[]
  length: number
  stringOrder: KanteleStringOrder
  onPlaceNote: (string: number, step: number) => void
}

export function KanteleChordStamp({
  tuning,
  length,
  stringOrder,
  onPlaceNote,
}: Props) {
  const [stringIndex, setStringIndex] = useState(0)
  const [stepInput, setStepInput] = useState(1)

  const stringIndexes = orderedStringIndexes(tuning.length, stringOrder)

  const onClickPlace = () => {
    const step = Math.min(Math.max(stepInput, 1), length) - 1
    // 弦を削除した直後など、選択中のindexが範囲外になっている場合に備える
    const target = Math.min(stringIndex, tuning.length - 1)
    onPlaceNote(target, step)
  }

  return (
    <div className='flex flex-wrap items-end gap-2'>
      <div>
        <p className='pb-2 text-sm font-bold'>弦</p>
        <Select
          value={String(stringIndex)}
          onValueChange={(value) => setStringIndex(Number(value))}
        >
          <SelectTrigger className='w-36'>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {stringIndexes.map((index) => (
              <SelectItem key={index} value={String(index)}>
                {stringNumberLabel(index)}({tuning[index]})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <p className='pb-2 text-sm font-bold'>ステップ</p>
        <Input
          type='number'
          min={1}
          max={length}
          value={stepInput}
          onChange={(e) => setStepInput(Number(e.target.value))}
          className='w-24'
        />
      </div>

      <Button type='button' onClick={onClickPlace}>
        配置
      </Button>
    </div>
  )
}
