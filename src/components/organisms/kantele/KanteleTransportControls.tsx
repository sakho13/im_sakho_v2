"use client"

import { PauseIcon, PlayIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"

type Props = {
  bpm: number
  length: number
  stepsPerBeat: number
  beatsPerMeasure: number
  isPlaying: boolean
  onChangeBpm: (bpm: number) => void
  onChangeLength: (length: number) => void
  onChangeStepsPerBeat: (stepsPerBeat: number) => void
  onChangeBeatsPerMeasure: (beatsPerMeasure: number) => void
  onTogglePlay: () => void
}

export function KanteleTransportControls({
  bpm,
  length,
  stepsPerBeat,
  beatsPerMeasure,
  isPlaying,
  onChangeBpm,
  onChangeLength,
  onChangeStepsPerBeat,
  onChangeBeatsPerMeasure,
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
        <p className='pb-2 text-sm font-bold'>拍子(1小節の拍数): {beatsPerMeasure}拍子</p>
        <p className='pb-2 text-xs text-muted-foreground'>
          例: 3/4拍子や3/8拍子は「3拍子」、2/4拍子は「2拍子」を選んでください。
          何分音符が1拍かはこのツールでは区別しません。
        </p>
        <Slider
          value={[beatsPerMeasure]}
          min={1}
          max={12}
          step={1}
          onValueChange={(v) => onChangeBeatsPerMeasure(v[0])}
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
