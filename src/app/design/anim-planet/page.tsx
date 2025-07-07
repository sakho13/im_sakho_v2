"use client"

import { useState } from "react"
import { AnimPlanetLine } from "@/types/anim-planet"
import { DEFAULT_ANIM_PLANET_LINES } from "@/statics/data/anim-planet-lines"
import { AnimPlanet } from "@/components/atoms/animation/AnimPlanet"
import { SimpleTemplate } from "@/components/templates/SimpleTemplate"
import { CircleXIcon } from "lucide-react"
import { AnimBase } from "@/components/atoms/animation/AnimBase"
import { joinCN } from "@/lib/functions/joinCN"

export default function Page() {
  const [size, setSize] = useState(200)
  const [lines, setLines] = useState(DEFAULT_ANIM_PLANET_LINES)

  const _onChangeSize = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSize(Number(e.target.value))
  }

  const _onAddLine = () => {
    const newLine = {
      x1: -50,
      y1: 50,
      x2: 350,
      y2: 250,
      stroke: "#add8e6",
      strokeWidth: 20,
    }
    setLines((prev) => [...prev, newLine])
  }

  const _onRemoveLine = (index: number) => {
    setLines((prev) => prev.filter((_, i) => i !== index))
  }

  const _onChangeLine = <K extends keyof AnimPlanetLine>(
    index: number,
    key: K,
    value: AnimPlanetLine[K],
  ) => {
    setLines((prev) => {
      const newLines = [...prev]
      newLines[index][key] = value
      return newLines
    })
  }

  return (
    <SimpleTemplate title='Anim Planet'>
      <div
        className={joinCN(
          `w-full h-full`,
          `grid gap-x-2 lg:grid-cols-2 md:grid-cols-2 grid-cols-1`,
        )}
      >
        <div className='flex justify-center relative bg-gray-100 rounded-sm shadow-sm'>
          <AnimBase viewDebugFrame={true} ox={size / 2} oy={size / 2}>
            <AnimPlanet size={size} lines={lines} />
          </AnimBase>
        </div>

        <div className='overflow-y-scroll h-[calc(100vh-200px)]'>
          <p>Property</p>

          <div className='mx-2'>
            <p>Radius</p>

            <div className='mx-2'>
              <label htmlFor='size'>Size</label>
              <input
                id='size'
                type='number'
                value={size}
                onChange={_onChangeSize}
                className='border border-gray-300 rounded p-2'
              />
            </div>
          </div>

          <div className='mx-2'>
            <p>Lines</p>

            <div className='mx-2 py-2 gap-y-2 grid grid-cols-1'>
              {lines.map((line, lineIndex) => (
                <div
                  key={`line-property-${lineIndex}`}
                  className='mx-2 rounded-md border-gray-300 border px-4 py-2 gap-y-2 grid relative'
                >
                  <button
                    className='absolute left-[-10] top-[-8] bg-red-200 rounded-full'
                    onClick={() => _onRemoveLine(lineIndex)}
                  >
                    <CircleXIcon color='red' />
                  </button>

                  <div className='ml-2 grid gap-2 grid-cols-2'>
                    <div>
                      <label htmlFor={`line-${lineIndex}-color`}>Color</label>
                      <input
                        id={`line-${lineIndex}-color`}
                        type='color'
                        value={line.stroke}
                        onChange={(e) =>
                          _onChangeLine(lineIndex, "stroke", e.target.value)
                        }
                        className='border border-gray-300 rounded p-2'
                      />
                    </div>

                    <div>
                      <label htmlFor={`line-${lineIndex}-width`}>Width</label>
                      <input
                        id={`line-${lineIndex}-width`}
                        type='number'
                        value={line.strokeWidth}
                        onChange={(e) =>
                          _onChangeLine(
                            lineIndex,
                            "strokeWidth",
                            Number(e.target.value),
                          )
                        }
                        className='border border-gray-300 rounded p-2'
                      />
                    </div>

                    <div className=''>
                      <label htmlFor={`line-${lineIndex}-x1`}>X1</label>
                      <input
                        id={`line-${lineIndex}-x1`}
                        type='number'
                        value={line.x1}
                        onChange={(e) =>
                          _onChangeLine(lineIndex, "x1", Number(e.target.value))
                        }
                        className='border border-gray-300 rounded p-2'
                      />
                    </div>

                    <div>
                      <label htmlFor={`line-${lineIndex}-y1`}>Y1</label>
                      <input
                        id={`line-${lineIndex}-y1`}
                        type='number'
                        value={line.y1}
                        onChange={(e) =>
                          _onChangeLine(lineIndex, "y1", Number(e.target.value))
                        }
                        className='border border-gray-300 rounded p-2'
                      />
                    </div>

                    <div>
                      <label htmlFor={`line-${lineIndex}-x2`}>X2</label>
                      <input
                        id={`line-${lineIndex}-x2`}
                        type='number'
                        value={line.x2}
                        onChange={(e) =>
                          _onChangeLine(lineIndex, "x2", Number(e.target.value))
                        }
                        className='border border-gray-300 rounded p-2'
                      />
                    </div>

                    <div>
                      <label htmlFor={`line-${lineIndex}-y2`}>Y2</label>
                      <input
                        id={`line-${lineIndex}-y2`}
                        type='number'
                        value={line.y2}
                        onChange={(e) =>
                          _onChangeLine(lineIndex, "y2", Number(e.target.value))
                        }
                        className='border border-gray-300 rounded p-2'
                      />
                    </div>
                  </div>
                </div>
              ))}

              <div>
                <button
                  onClick={_onAddLine}
                  className='bg-blue-500 text-white rounded px-4 py-2'
                >
                  Add Line
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SimpleTemplate>
  )
}
