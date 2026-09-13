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
import { scaleDegreeLabel } from "@/lib/functions/kantele/scaleDegree"

type Props = {
  tuning: string[]
  length: number
  onPlaceNote: (string: number, step: number) => void
}

export function KanteleChordStamp({ tuning, length, onPlaceNote }: Props) {
  const [stringIndex, setStringIndex] = useState(0)
  const [stepInput, setStepInput] = useState(1)

  const onClickPlace = () => {
    const step = Math.min(Math.max(stepInput, 1), length) - 1
    onPlaceNote(stringIndex, step)
  }

  return (
    <div className='flex flex-wrap items-end gap-2'>
      <div>
        <p className='pb-2 text-sm font-bold'>コード(音度)</p>
        <Select
          value={String(stringIndex)}
          onValueChange={(value) => setStringIndex(Number(value))}
        >
          <SelectTrigger className='w-32'>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {tuning.map((note, index) => (
              <SelectItem key={index} value={String(index)}>
                {scaleDegreeLabel(index)} ({note})
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
