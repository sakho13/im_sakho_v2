"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { usePathname } from "next/navigation"
import { AnimPlanet } from "@/components/atoms/animation/AnimPlanet"
import { AnimBase } from "@/components/atoms/animation/AnimBase"
import { joinCN } from "@/lib/functions/joinCN"

export function PlanetsBackground() {
  const pathname = usePathname()

  const requestRef = useRef<number>(0)
  const posRef = useRef({ x: 400, y: 10 })
  const velRef = useRef({ x: 0, y: -1.3 })

  const rotateSumRef = useRef(0)
  const rotatePlanetRef = useRef(0)

  const [, setTick] = useState(0)

  // トップページ以外はこのアニメーションを薄くする
  const isTop = useMemo(() => pathname === "/", [pathname])

  useEffect(() => {
    const dt = 1
    const GM = 1000

    const step = () => {
      const p = posRef.current
      const v = velRef.current
      const r = Math.sqrt(p.x * p.x + p.y * p.y)
      const ax = (-GM * p.x) / r ** 3
      const ay = (-GM * p.y) / r ** 3

      v.x += ax * dt
      v.y += ay * dt
      p.x += v.x * dt
      p.y += v.y * dt
      rotateSumRef.current += -0.1
      rotatePlanetRef.current += -0.3

      setTick((t) => t + 1)
      requestRef.current = requestAnimationFrame(step)
    }

    requestRef.current = requestAnimationFrame(step)
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current)
    }
  }, [])

  return (
    <div className='pointer-events-none fixed left-0 top-0 -z-10 h-full w-full'>
      <div className='relative h-full w-full'>
        <div
          className={joinCN(
            "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
            isTop ? "opacity-100" : "opacity-20",
          )}
        >
          <AnimBase ox={70} oy={70} rotation={rotateSumRef.current}>
            <AnimPlanet size={150} />
          </AnimBase>

          <AnimBase
            x={posRef.current.x}
            y={posRef.current.y}
            ox={50}
            oy={50}
            rotation={rotatePlanetRef.current}
          >
            <AnimPlanet size={130} baseColor='#f9d878' />
          </AnimBase>
        </div>
      </div>
    </div>
  )
}
