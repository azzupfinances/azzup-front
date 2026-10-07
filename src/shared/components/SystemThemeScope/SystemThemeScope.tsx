'use client'

import { useLayoutEffect } from 'react'

import { applyStoredTheme, clearAppliedTheme } from '@/lib/theme/theme'

// Mounted by the system layout: applies the saved theme on the way in (layout effect,
// so there is no light flash) and restores light on the way out to public pages.
export function SystemThemeScope() {
  useLayoutEffect(() => {
    applyStoredTheme()

    return clearAppliedTheme
  }, [])

  return null
}
