import React from "react"
import { Textarea } from "../ui/textarea"
import { toast } from "sonner"

type Props = { copyAction?: boolean } & React.ComponentProps<"textarea">

export function MultiTextarea(props: Props) {
  const { copyAction, ...rest } = props

  const textareaRef = React.useRef<HTMLTextAreaElement>(null)

  const onClick = async () => {
    if (!copyAction) return
    if (!textareaRef.current) return

    textareaRef.current.select()
    textareaRef.current.setSelectionRange(0, 99999) // For mobile devices

    try {
      const value = textareaRef.current.value
      if (!value) {
        toast.error("コピーする内容がありません")
        return
      }

      await navigator.clipboard.writeText(value)
      toast.success("コピーしました")
    } catch {
      toast.error("コピーに失敗しました")
    }
  }

  return (
    <div className='relative'>
      <Textarea {...rest} ref={textareaRef} onClick={onClick} />
    </div>
  )
}
