import { useAssembly } from "@/hooks/useAssembly"
import { CodeEditor } from "../atoms/CodeEditor"

export function AssemblySimulator() {
  const { code, onChangeCode } = useAssembly()

  return (
    <div id='assembly-simulator' className='grid gap-y-4'>
      <div className='mx-4'>
        <p className='pb-2 font-bold select-none'>CodeEditor</p>
        <CodeEditor code={code} onChangeCode={onChangeCode} />
      </div>

      <div className='mx-4'>
        <p className='pb-2 font-bold select-none'>Output</p>
      </div>
    </div>
  )
}
