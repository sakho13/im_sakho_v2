"use client"

import { useEffect, useRef, useState } from "react"
import { AnimPlanet } from "@/components/atoms/animation/AnimPlanet"
import { AnimBase } from "@/components/atoms/animation/AnimBase"

export function PlanetsBackground() {
  const requestRef = useRef<number>(0)
  const posRef = useRef({ x: 200, y: 0 })
  const velRef = useRef({ x: 0, y: -1 })
  const [, setTick] = useState(0)

  useEffect(() => {
    const dt = 1 / 60
    const GM = 4000

    const step = () => {
      const p = posRef.current
      const v = velRef.current
      const r = Math.sqrt(p.x * p.x + p.y * p.y)
      const ax = (-GM * p.x) / (r ** 3)
      const ay = (-GM * p.y) / (r ** 3)

      v.x += ax * dt
      v.y += ay * dt
      p.x += v.x * dt
      p.y += v.y * dt

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
        <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>
          <AnimBase ox={70} oy={70}>
            <AnimPlanet size={140} />
          </AnimBase>

          <AnimBase x={posRef.current.x} y={posRef.current.y} ox={50} oy={50}>
            <AnimPlanet size={100} baseColor='#f9d878' />
          </AnimBase>
        </div>
      </div>
    </div>
  )
}
