import { useEffect, useRef, useState } from 'react'

// Animates a number from 0 to `target` each time `isActive` turns on. While active, a new
// `target` rolls from the value currently shown instead of restarting from 0.
export function useCountUp(target: number, isActive: boolean, durationMs = 1400) {
  const [value, setValue] = useState(0)
  const currentValueRef = useRef(0)

  useEffect(() => {
    if (!isActive) {
      currentValueRef.current = 0
      setValue(0)
      return
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      currentValueRef.current = target
      setValue(target)
      return
    }

    let frameId = 0
    const startValue = currentValueRef.current
    const startTime = performance.now()

    function tick(now: number) {
      const progress = Math.min((now - startTime) / durationMs, 1)
      const easedProgress = 1 - (1 - progress) ** 3
      const nextValue = Math.round(startValue + (target - startValue) * easedProgress)

      currentValueRef.current = nextValue
      setValue(nextValue)

      if (progress < 1) {
        frameId = requestAnimationFrame(tick)
      }
    }

    frameId = requestAnimationFrame(tick)

    return () => cancelAnimationFrame(frameId)
  }, [target, isActive, durationMs])

  return value
}
