import { useSyncExternalStore } from 'react'

import { getTodayIsoDate } from '@/shared/utils/iso-date'

function subscribeToNothing() {
  return () => {}
}

// Today's date from the browser. Pages are prerendered, so the server returns `null`
// instead of the build date; callers render a date-independent fallback until hydration.
export function useTodayIsoDate() {
  return useSyncExternalStore(subscribeToNothing, getTodayIsoDate, () => null)
}
