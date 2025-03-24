import { useMemo, useState } from "react"

const BRAIN_FUCK_TOKEN = {
  SHIFT_RIGHT: ">",
  SHIFT_LEFT: "<",
  INCREMENT: "+",
  DECREMENT: "-",
  OUTPUT: ".",
  INPUT: ",",
  LOOP_START: "[",
  LOOP_END: "]",
} as const

export function useBrainFuck() {
  const [code, setCode] = useState<string>("")
  const [pointer, setPointer] = useState<number>(0)
  const [memory, setMemory] = useState<number[]>(Array(30000).fill(0))
  const [output, setOutput] = useState<string>("")

  const resetCode = useMemo(() => {
    setCode("")
  }, [])

  const onChangeCode = (value: string) => {
    setCode(value)
  }

  /**
   * メモリをリセットする
   */
  const resetMemory = useMemo(() => {
    setMemory(Array(30000).fill(0))
    setPointer(0)
  }, [])

  /**
   * BrainFuckのコードを実行する
   */
  const run = () => {
    let cursor: number | null = null
    do {
      if (cursor === null) cursor = 0
      cursor = _exe(cursor)
      // if (cursor !== null) setPointer(cursor)
    } while (cursor !== null)
  }

  const _exe = (cursor: number): number | null => {
    const token = code[cursor]
    if (!token) return null
    switch (token) {
      case BRAIN_FUCK_TOKEN.SHIFT_RIGHT:
        if (pointer >= 30000 - 1) throw new Error("overflow pointer")
        setPointer((c) => c + 1)
        return cursor + 1
      case BRAIN_FUCK_TOKEN.SHIFT_LEFT:
        if (pointer <= 0) throw new Error("overflow pointer minus")
        setPointer((c) => c - 1)
        return cursor + 1

      case BRAIN_FUCK_TOKEN.INCREMENT:
        return cursor + 1
      case BRAIN_FUCK_TOKEN.DECREMENT:
        return cursor + 1

      case BRAIN_FUCK_TOKEN.INPUT:
        return cursor + 1
      case BRAIN_FUCK_TOKEN.OUTPUT:
        return cursor + 1

      case BRAIN_FUCK_TOKEN.LOOP_START:
        return cursor + 1
      case BRAIN_FUCK_TOKEN.LOOP_END:
        return cursor + 1

      default:
        return null
    }
  }

  return {
    code,
    pointer,
    memory,
    output,

    resetCode,
    resetMemory,
    onChangeCode,
    run,
  }
}
