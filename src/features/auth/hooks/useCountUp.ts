import { useEffect, useState } from 'react'

// Animates a number from 0 to `target` each time `isActive` turns on.
export function useCountUp(target: number, isActive: boolean, durationMs = 1400) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!isActive) {
      return
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setValue(target)
      return
    }

    let frameId = 0
    const startTime = performance.now()

    function tick(now: number) {
      const progress = Math.min((now - startTime) / durationMs, 1)
      const easedProgress = 1 - (1 - progress) ** 3

      setValue(Math.round(target * easedProgress))

      if (progress < 1) {
        frameId = requestAnimationFrame(tick)
      }
    }

    frameId = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(frameId)
      setValue(0)
    }
  }, [target, isActive, durationMs])

  return value
}
