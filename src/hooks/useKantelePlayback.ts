import { useCallback, useEffect, useRef, useState } from "react"
import { KanteleScore } from "@/types/kantele"
import { noteNameToFrequency } from "@/lib/functions/kantele/noteFrequency"
import {
  stepDurationSeconds,
  stepIndexAtElapsed,
} from "@/lib/functions/kantele/timing"

export function useKantelePlayback(score: KanteleScore) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentStep, setCurrentStep] = useState<number | null>(null)

  const scoreRef = useRef(score)
  scoreRef.current = score

  const audioContextRef = useRef<AudioContext | null>(null)
  const startTimeRef = useRef(0)
  const playedStepsRef = useRef<Set<number>>(new Set())
  const animationFrameRef = useRef<number | null>(null)

  const pluck = useCallback((noteName: string) => {
    const ctx = audioContextRef.current
    if (!ctx) return

    const now = ctx.currentTime
    const oscillator = ctx.createOscillator()
    const gain = ctx.createGain()

    oscillator.type = "triangle"
    oscillator.frequency.setValueAtTime(noteNameToFrequency(noteName), now)

    gain.gain.setValueAtTime(0.3, now)
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 1)

    oscillator.connect(gain)
    gain.connect(ctx.destination)

    oscillator.start(now)
    oscillator.stop(now + 1.1)
  }, [])

  const stop = useCallback(() => {
    if (animationFrameRef.current !== null) {
      cancelAnimationFrame(animationFrameRef.current)
      animationFrameRef.current = null
    }
    setIsPlaying(false)
    setCurrentStep(null)
  }, [])

  const tick = useCallback(() => {
    const ctx = audioContextRef.current
    if (!ctx) return

    const current = scoreRef.current
    const duration = stepDurationSeconds(current.bpm, current.stepsPerBeat)
    const elapsed = ctx.currentTime - startTimeRef.current
    const step = stepIndexAtElapsed(elapsed, duration)

    if (step >= current.length) {
      stop()
      return
    }

    setCurrentStep(step)

    if (!playedStepsRef.current.has(step)) {
      playedStepsRef.current.add(step)
      for (const note of current.notes) {
        if (note.step === step) {
          pluck(current.tuning[note.string])
        }
      }
    }

    animationFrameRef.current = requestAnimationFrame(tick)
  }, [pluck, stop])

  const play = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContext()
    }
    if (audioContextRef.current.state === "suspended") {
      audioContextRef.current.resume()
    }

    startTimeRef.current = audioContextRef.current.currentTime
    playedStepsRef.current = new Set()
    setIsPlaying(true)
    animationFrameRef.current = requestAnimationFrame(tick)
  }, [tick])

  const togglePlay = useCallback(() => {
    if (isPlaying) {
      stop()
    } else {
      play()
    }
  }, [isPlaying, play, stop])

  useEffect(() => {
    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      audioContextRef.current?.close()
    }
  }, [])

  return { isPlaying, currentStep, play, stop, togglePlay }
}
