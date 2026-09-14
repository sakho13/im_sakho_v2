import { useCallback, useLayoutEffect, useState } from "react"

// 要素の表示幅を監視する。ResizeObserver非対応環境ではマウント時の実測のみ行う。
export function useElementWidth<T extends HTMLElement>() {
  const [element, setElement] = useState<T | null>(null)
  const [width, setWidth] = useState(0)

  const ref = useCallback((node: T | null) => {
    setElement(node)
  }, [])

  useLayoutEffect(() => {
    if (!element) return

    const update = () => setWidth(element.clientWidth)
    update()

    if (typeof ResizeObserver === "undefined") return

    const observer = new ResizeObserver(update)
    observer.observe(element)
    return () => observer.disconnect()
  }, [element])

  return { ref, width }
}
