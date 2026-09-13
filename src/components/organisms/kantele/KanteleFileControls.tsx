"use client"

import { useRef } from "react"
import { DownloadIcon, RotateCcwIcon, UploadIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { downloadTextFile } from "@/lib/functions/downloadTextFile"

type Props = {
  title: string
  onChangeTitle: (title: string) => void
  exportYaml: () => string
  onImportYaml: (text: string) => void
  onReset: () => void
}

export function KanteleFileControls({
  title,
  onChangeTitle,
  exportYaml,
  onImportYaml,
  onReset,
}: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const onClickExport = () => {
    downloadTextFile(`${title || "kantele-tab"}.yaml`, exportYaml())
  }

  const onClickImport = () => {
    fileInputRef.current?.click()
  }

  const onFileSelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    e.target.value = ""
    if (!file) return

    const text = await file.text()
    onImportYaml(text)
  }

  const onClickReset = () => {
    if (
      window.confirm(
        "編集中の譜面を破棄して初期状態に戻します。この操作は取り消せません。よろしいですか?",
      )
    ) {
      onReset()
    }
  }

  return (
    <div className='grid gap-2'>
      <div>
        <p className='pb-2 text-sm font-bold'>タイトル</p>
        <Input
          value={title}
          onChange={(e) => onChangeTitle(e.target.value)}
          placeholder='無題のタブ譜'
        />
      </div>

      <div className='flex flex-wrap gap-2'>
        <Button type='button' variant='outline' onClick={onClickExport}>
          <DownloadIcon />
          <span>YAMLをエクスポート</span>
        </Button>

        <Button type='button' variant='outline' onClick={onClickImport}>
          <UploadIcon />
          <span>YAMLをインポート</span>
        </Button>
        <input
          ref={fileInputRef}
          type='file'
          accept='.yaml,.yml'
          className='hidden'
          onChange={onFileSelected}
        />

        <Button type='button' variant='destructive' onClick={onClickReset}>
          <RotateCcwIcon />
          <span>初期化</span>
        </Button>
      </div>
    </div>
  )
}
