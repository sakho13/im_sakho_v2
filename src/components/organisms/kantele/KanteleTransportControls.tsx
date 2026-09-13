"use client"

import { PauseIcon, PlayIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"

type Props = {
  bpm: number
  length: number
  stepsPerBeat: number
  isPlaying: boolean
  onChangeBpm: (bpm: number) => void
  onChangeLength: (length: number) => void
  onChangeStepsPerBeat: (stepsPerBeat: number) => void
  onTogglePlay: () => void
}

export function KanteleTransportControls({
  bpm,
  length,
  stepsPerBeat,
  isPlaying,
  onChangeBpm,
  onChangeLength,
  onChangeStepsPerBeat,
  onTogglePlay,
}: Props) {
  return (
    <div className='grid gap-4'>
      <div className='flex items-center gap-4'>
        <Button type='button' onClick={onTogglePlay}>
          {isPlaying ? <PauseIcon /> : <PlayIcon />}
          <span>{isPlaying ? "停止" : "再生"}</span>
        </Button>
      </div>

      <div>
        <p className='pb-2 text-sm font-bold'>BPM: {bpm}</p>
        <Slider
          value={[bpm]}
          min={20}
          max={300}
          step={1}
          onValueChange={(v) => onChangeBpm(v[0])}
        />
      </div>

      <div>
        <p className='pb-2 text-sm font-bold'>グリッド解像度(1拍あたりのステップ数): {stepsPerBeat}</p>
        <Slider
          value={[stepsPerBeat]}
          min={1}
          max={8}
          step={1}
          onValueChange={(v) => onChangeStepsPerBeat(v[0])}
        />
      </div>

      <div>
        <p className='pb-2 text-sm font-bold'>譜面の長さ(ステップ数): {length}</p>
        <Slider
          value={[length]}
          min={4}
          max={128}
          step={1}
          onValueChange={(v) => onChangeLength(v[0])}
        />
      </div>
    </div>
  )
}
