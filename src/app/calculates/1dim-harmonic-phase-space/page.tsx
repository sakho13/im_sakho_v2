"use client"

import { useMemo, useState } from "react"
import {
  CartesianGrid,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { SimpleTemplate } from "@/components/templates/SimpleTemplate"
import { useConvertMd } from "@/hooks/useConvertMd"
import { Slider } from "@/components/ui/slider"

export default function Page() {
  const [m, setM] = useState(1)
  const [dt, setDt] = useState(0.02)
  const [steps, setSteps] = useState(400)

  const [q0, p0] = [0, 1]

  // const [q, setQ] = useState(q0)
  // const [p, setP] = useState(p0)

  const data = useMemo(() => {
    const phase: { q: number; p: number }[] = []
    let q = q0,
      p = p0

    for (let i = 0; i < steps; i++) {
      // 半ステップで運動量更新
      const pHalf = p - dVdq(q) * dt
      // 位置更新
      const qNew = q + (pHalf / m) * dt
      // 完全ステップで運動量更新
      const pNew = pHalf - dVdq(qNew) * dt

      phase.push({ q: qNew, p: pNew })

      // 状態を次へ
      q = qNew
      p = pNew
    }
    return phase
  }, [q0, p0, dt, m, steps])

  // function potential(q: number): number {
  //   return 0.5 * q ** 2
  // }

  function dVdq(q: number): number {
    return q
  }

  const { html } = useConvertMd({
    md: content,
  })

  return (
    <SimpleTemplate title='1次元調和振動子の位相空間'>
      <div className='calculates-content'>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </div>

      <div>
        <p>調和振動子の位相空間を可視化</p>

        <div className='mx-4'>
          <div>
            <label className='text-sm'>質量 m: {m} kg</label>
            <Slider
              value={[m]}
              min={0.1}
              max={10}
              step={0.1}
              onValueChange={([value]) => setM(value)}
              className='my-2 mx-2'
            />
          </div>

          <div>
            <label className='text-sm'> dt: {dt} s</label>
            <Slider
              value={[dt]}
              min={0.01}
              max={1}
              step={0.01}
              onValueChange={([value]) => setDt(value)}
              className='my-2 mx-2'
            />
          </div>

          <div>
            <label className='text-sm'> steps: {steps} </label>
            <Slider
              value={[steps]}
              min={1}
              max={1000}
              step={1}
              onValueChange={([value]) => setSteps(value)}
              className='my-2 mx-2'
            />
          </div>
        </div>

        <ResponsiveContainer width='90%' height={700} className={"py-10"}>
          <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid />
            <XAxis
              type='number'
              dataKey='q'
              name='位置'
              unit='m'
              label={{ value: "位置 q", position: "bottom", offset: 0 }}
            />
            <YAxis
              type='number'
              dataKey='p'
              name='運動量'
              unit='kg·m/s'
              label={{ value: "運動量 p", angle: -90, position: "insideLeft" }}
            />
            <Tooltip cursor={{ strokeDasharray: "3 3" }} />
            <Scatter name='Phase Space' data={data} fill='#e6865a' />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </SimpleTemplate>
  )
}

const content = `
# 調和振動子の位相空間

1次元の調和振動子を位相空間で可視化します。

アルゴリズムには、シンプレクティック・オイラー法を用いる。
このアルゴリズムの特徴は、ハミルトニアン（エネルギー）を保存できることにある。

## 調和振動子のハミルトニアン

$$
H(q, p) = \\frac{p^2}{2m} + \\frac{k}{2} q^2 = T(p) + U(q) \\tag{0}
$$

$$
\\dot{q} = \\frac{\\partial H}{\\partial p} = \\frac{p}{m} \\tag{1}
$$

$$
\\dot{p} = -\\frac{\\partial H}{\\partial q} = -kq = - U'(q) \\tag{2}
$$

## 数値解法

正準運動方程式 (1),(2) をそれぞれ離散化する。

$$
\\frac{q_{n+1} - q_{n}}{\\delta t} = \\frac{p_{n}}{m} \\implies q_{n+1} = q_{n} + \\frac{p_{n}}{m} \\delta t \\tag{3}
$$

$$
\\frac{p_{n+1} - p_{n}}{\\delta t} = - k q_{n} \\implies p_{n+1} = p_{n} - k q_{n} \\delta t \\tag{4}
$$

つまり、$n+1$ステップは $q_{n+1} = q_{n+1}(q_{n}, p_{n}), p_{n+1} = p_{n+1}(q_{n}, p_{n})$ と表せる。

ここで、半ステップ状態の運動量 $p_{n+1/2}$ を導入する。

$$
p_{n+1/2} = p_{n} - \\frac{k}{2} q_{n} \\delta t \\tag{5}
$$

半ステップ運動量を使い、位置と運動量を更新する。

$$
q_{n+1} = q_{n} + \\frac{p_{n+1/2}}{m} \\delta t \\tag{6}
$$

$$
p_{n+1} = p_{n+1/2} - \\frac{k}{2} q_{n+1} \\delta t \\tag{7}
$$

## 保存量の確認

`
