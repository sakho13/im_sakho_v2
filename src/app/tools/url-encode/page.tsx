"use client"

import { SimpleTemplate } from "@/components/templates/SimpleTemplate"
import { Textarea } from "@/components/ui/textarea"
import { useEncodeUrl } from "@/hooks/useEncodeUrl"

export default function Page() {
  const { text, encoded, onChangeText } = useEncodeUrl()

  return (
    <SimpleTemplate title='URL encode'>
      <div className='mx-4'>
        <p className='pb-2 font-bold'>Raw Text</p>

        <Textarea
          value={text}
          onChange={(e) => onChangeText(e.target.value)}
          placeholder='some text'
          rows={5}
        />
      </div>

      <div className='mx-4 mt-4'>
        <p className='pb-2 font-bold'>Encoded Text</p>

        <Textarea
          value={encoded}
          readOnly
          placeholder='encoded text'
          rows={7}
        />
      </div>
    </SimpleTemplate>
  )
}
