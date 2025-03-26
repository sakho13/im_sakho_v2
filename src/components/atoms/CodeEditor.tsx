import ReactCodeMirror from "@uiw/react-codemirror"

type Props = {
  code: string
  onChangeCode: (value: string) => void
}

export function CodeEditor({ code, onChangeCode }: Props) {
  return <ReactCodeMirror value={code} onChange={onChangeCode} />
}
