import { joinCN } from "@/lib/functions/joinCN"

type Props = {
  children: React.ReactNode
  ox?: number
  oy?: number
  x?: number
  y?: number
  size?: number
  rotation?: number
  durationMs?: number
  easing?: "ease" | "linear" | "ease-in" | "ease-out" | "ease-in-out"
  viewDebugFrame?: boolean
}

export function AnimBase({
  children,
  ox = 0,
  oy = 0,
  x = 0,
  y = 0,
  size = 1,
  rotation = 0,
  durationMs = 0,
  easing = "ease",
  viewDebugFrame = false,
}: Props) {
  return (
    <div
      className={joinCN(`anim-base-container`, `absolute left-0 top-0`)}
      style={{
        transformOrigin: `${ox}px ${oy}px`,
        transform: `translate(${x}px, ${y}px) scale(${size}) rotate(${rotation}deg)`,
        transition: `transform ${durationMs}ms 0s ${easing}`,
        border: viewDebugFrame ? `1px solid red` : `none`,
      }}
      title={`origin: ${ox}px ${oy}px; translate: ${x}px ${y}px; scale: ${size}; rotate: ${rotation}deg;`}
    >
      {children}

      {viewDebugFrame && (
        <div
          className={joinCN(
            `anim-base-debug-frame`,
            `absolute`,
            `z-50 top-0 left-0`,
          )}
          style={{
            transformOrigin: `${ox}px ${oy}px`,
          }}
        >
          <div
            className={joinCN(
              `absolute left-0 top-0`,
              `h-[5px] w-[5px] bg-red-600`,
              `rounded-full`,
              `z-50`,
            )}
          ></div>
        </div>
      )}
    </div>
  )
}
