"use client"

import { SimpleTemplate } from "@/components/templates/SimpleTemplate"
import { KanteleGrid } from "@/components/organisms/kantele/KanteleGrid"
import { KanteleTuningControls } from "@/components/organisms/kantele/KanteleTuningControls"
import { KanteleTransportControls } from "@/components/organisms/kantele/KanteleTransportControls"
import { KanteleFileControls } from "@/components/organisms/kantele/KanteleFileControls"
import { useKanteleScore } from "@/hooks/useKanteleScore"
import { useKantelePlayback } from "@/hooks/useKantelePlayback"
import { useKanteleViewPrefs } from "@/hooks/useKanteleViewPrefs"

export default function Page() {
  const {
    score,
    toggleNote,
    setTuningNote,
    addString,
    removeString,
    applyTuningPreset,
    setBpm,
    setStepsPerBeat,
    setLength,
    setTitle,
    exportYaml,
    importYaml,
    reset,
  } = useKanteleScore()

  const { isPlaying, currentStep, togglePlay } = useKantelePlayback(score)
  const { stringOrder, toggleStringOrder } = useKanteleViewPrefs()

  return (
    <SimpleTemplate title='カンテレ タブ譜エディタ'>
      <div className='mx-4 mt-4'>
        <KanteleFileControls
          title={score.title}
          onChangeTitle={setTitle}
          exportYaml={exportYaml}
          onImportYaml={importYaml}
          onReset={reset}
        />
      </div>

      <div className='mx-4 mt-4'>
        <p className='pb-2 font-bold'>調弦</p>
        <KanteleTuningControls
          tuning={score.tuning}
          stringOrder={stringOrder}
          onChangeNote={setTuningNote}
          onAddString={addString}
          onRemoveString={removeString}
          onApplyPreset={applyTuningPreset}
          onToggleStringOrder={toggleStringOrder}
        />
      </div>

      <div className='mx-4 mt-4'>
        <p className='pb-2 font-bold'>再生・グリッド設定</p>
        <KanteleTransportControls
          bpm={score.bpm}
          length={score.length}
          stepsPerBeat={score.stepsPerBeat}
          isPlaying={isPlaying}
          onChangeBpm={setBpm}
          onChangeLength={setLength}
          onChangeStepsPerBeat={setStepsPerBeat}
          onTogglePlay={togglePlay}
        />
      </div>

      <div className='mx-4 mt-4 min-w-0'>
        <p className='pb-1 font-bold'>タブ譜</p>
        <p className='pb-2 text-xs text-muted-foreground'>
          横線1本が弦1本です(左端の数字が弦番号)。マスをクリックすると音を置けます。上の数字は拍で、画面幅に合わせて段に折り返します。
        </p>
        <KanteleGrid
          tuning={score.tuning}
          length={score.length}
          stepsPerBeat={score.stepsPerBeat}
          notes={score.notes}
          currentStep={currentStep}
          stringOrder={stringOrder}
          onToggleNote={toggleNote}
        />
      </div>
    </SimpleTemplate>
  )
}
