"use client"

import { SimpleTemplate } from "@/components/templates/SimpleTemplate"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { useFormatJson } from "@/hooks/useFormatJson"

export default function Page() {
  const { textJson, formattedJson, onChangeText, space, onChangeSpace } =
    useFormatJson()

  return (
    <SimpleTemplate title='Reformat JSON'>
      <div className='mx-4 mt-4'>
        <p className='pb-2 font-bold'>Raw JSON Text</p>

        <Textarea
          value={textJson}
          onChange={(e) => onChangeText(e.target.value)}
          placeholder='some text'
          rows={5}
        />
      </div>

      <div className='mx-4 mt-4'>
        <Slider
          value={[space]}
          min={0}
          max={10}
          step={1}
          onValueChange={(v) => {
            onChangeSpace(v[0])
          }}
        />
      </div>

      <div className='mx-4 mt-4'>
        <p className='pb-2 font-bold'>Encoded Text (space: {space})</p>

        <Textarea
          value={formattedJson}
          readOnly
          placeholder='encoded text'
          rows={7}
        />
      </div>
    </SimpleTemplate>
  )
}
