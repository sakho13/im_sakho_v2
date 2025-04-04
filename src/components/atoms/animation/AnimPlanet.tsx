import { DEFAULT_ANIM_PLANET_LINES } from "@/statics/data/anim-planet-lines"
import { AnimPlanetLine } from "@/types/anim-planet"
import React from "react"

type Props = {
  size?: number
  lines?: AnimPlanetLine[]
  baseColor?: string
}

export function AnimPlanet({
  size = 140,
  lines = DEFAULT_ANIM_PLANET_LINES,
  baseColor = "#7ec3e0",
}: Props) {
  return (
    <svg width='300' height='300' viewBox='0 0 300 300'>
      <defs>
        <clipPath id='circleClip'>
          <circle cx='150' cy='150' r={size} />
        </clipPath>
      </defs>

      <circle cx='150' cy='150' r={size} fill={baseColor} />

      <g clipPath='url(#circleClip)'>
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
