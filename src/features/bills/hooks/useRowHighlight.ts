'use client'

import { useEffect, useRef, useState } from 'react'

// Long enough for the row to slide into its new group and flash.
const HIGHLIGHT_DURATION_MS = 1600

// Briefly marks one row (e.g. the entry just paid) so the UI can celebrate it.
export function useRowHighlight() {
  const [highlightedId, setHighlightedId] = useState<string | null>(null)
  const timeoutRef = useRef<number | undefined>(undefined)

  useEffect(() => () => window.clearTimeout(timeoutRef.current), [])

  function highlight(id: string) {
    window.clearTimeout(timeoutRef.current)
    setHighlightedId(id)
    timeoutRef.current = window.setTimeout(() => setHighlightedId(null), HIGHLIGHT_DURATION_MS)
  }

  return { highlightedId, highlight }
}
