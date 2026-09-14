import { useCallback, useEffect, useState } from "react"
import {
  DEFAULT_STRING_ORDER,
  KanteleStringOrder,
  oppositeStringOrder,
} from "@/lib/functions/kantele/kanteleStringLayout"
import {
  loadViewPrefs,
  saveViewPrefs,
} from "@/lib/functions/kantele/kanteleViewPrefs"

// 譜面データではなく「見え方」の設定。localStorageに保存してYAMLには含めない。
export function useKanteleViewPrefs() {
  const [stringOrder, setStringOrder] =
    useState<KanteleStringOrder>(DEFAULT_STRING_ORDER)

  useEffect(() => {
    setStringOrder(loadViewPrefs().stringOrder)
  }, [])

  useEffect(() => {
    saveViewPrefs({ stringOrder })
  }, [stringOrder])

  const toggleStringOrder = useCallback(() => {
    setStringOrder((prev) => oppositeStringOrder(prev))
  }, [])

  return { stringOrder, toggleStringOrder }
}
