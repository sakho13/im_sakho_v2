import { useAssembly } from "@/hooks/useAssembly"
import { CodeEditor } from "../atoms/CodeEditor"

export function AssemblySimulator() {
  const { code, onChangeCode } = useAssembly()

  return (
    <div id='assembly-simulator'>
      <CodeEditor code={code} onChangeCode={onChangeCode} />

      <div></div>
    </div>
  )
}
