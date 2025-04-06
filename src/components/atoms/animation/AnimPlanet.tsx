"use client"

import { useEffect, useState } from "react"
import { DEFAULT_ANIM_PLANET_LINES } from "@/statics/data/anim-planet-lines"
import { AnimPlanetLine } from "@/types/anim-planet"

type Props = {
  ref?: React.RefObject<SVGSVGElement>
  id?: string
  size?: number
  lines?: AnimPlanetLine[]
  baseColor?: string
}

export function AnimPlanet({
  ref,
  size = 140,
  lines = DEFAULT_ANIM_PLANET_LINES,
  baseColor = "#7ec3e0",
}: Props) {
  const [rnd, setRnd] = useState<string | null>(null)

  useEffect(() => {
    setRnd(`${Math.floor(Math.random() * 1000)}`)
  }, [])

  if (!rnd) return null

  return (
    <svg
      id={`planet-${rnd}`}
      ref={ref}
      width={size}
      height={size}
      viewBox={`${size / 2} ${size / 2} ${size} ${size}`}
      style={{
        left: `-${size / 2}px`,
        top: `-${size / 2}px`,
      }}
    >
      <defs>
        <clipPath id={`circleClip-${rnd}`}>
          <circle cx={size} cy={size} r={size / 2} />
        </clipPath>
      </defs>

      <g clipPath={`url(#circleClip-${rnd})`}>
        <circle cx={size} cy={size} r={size} fill={baseColor} />

        {lines.map((line, index) => (
          <line
            key={index}
            x1={line.x1}
            y1={line.y1}
            x2={line.x2}
            y2={line.y2}
            stroke={line.stroke}
            strokeWidth={line.strokeWidth}
          />
        ))}
      </g>
    </svg>
  )
}
