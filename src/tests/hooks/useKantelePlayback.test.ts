import { renderHook } from "@testing-library/react"
import { useKantelePlayback } from "@/hooks/useKantelePlayback"
import { createDefaultKanteleScore } from "@/lib/functions/kantele/createDefaultKanteleScore"

describe("hooks/useKantelePlayback", () => {
  test("初期状態は再生されておらず、currentStepはnull", () => {
    const { result } = renderHook(() =>
      useKantelePlayback(createDefaultKanteleScore()),
    )

    expect(result.current.isPlaying).toBe(false)
    expect(result.current.currentStep).toBeNull()
  })
})
