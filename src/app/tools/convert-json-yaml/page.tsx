"use client"

import { MultiTextarea } from "@/components/atoms/MultiTextarea"
import { SimpleTemplate } from "@/components/templates/SimpleTemplate"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { useConvertJsonYaml } from "@/hooks/useConvertJsonYaml"

export default function Page() {
  const { mode, text, converted, error, toggleMode, onChangeText } =
    useConvertJsonYaml()

  return (
    <SimpleTemplate title='convert JSON ↔ YAML'>
      <div className='mx-4 flex items-center space-x-2'>
        <Switch checked={mode === "to-json"} onCheckedChange={toggleMode} />
        <span>{mode}</span>
      </div>

      <div className='mx-4'>
        <p className='pb-2 font-bold'>
          Raw Text ({mode === "to-json" ? "YAML" : "JSON"})
        </p>

        <Textarea
          value={text}
          onChange={(e) => onChangeText(e.target.value)}
          placeholder=''
          rows={5}
        />

        {error && <p className='text-red-500 text-sm mt-2'>{error}</p>}
      </div>

      <div className='mx-4'>
        <p className='pb-2 font-bold'>{mode === "to-json" ? "JSON" : "YAML"}</p>

        <MultiTextarea
          value={converted}
          readOnly
          placeholder=''
          rows={7}
          copyAction
        />
      </div>
    </SimpleTemplate>
  )
}
