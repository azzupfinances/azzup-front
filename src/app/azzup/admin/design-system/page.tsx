import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { DesignSystemPage } from '@/features/design-system/components/DesignSystemPage/DesignSystemPage'

export const metadata: Metadata = {
  title: 'Design system',
}

// Admin-only area. Until the session (with user roles) exists, it is only reachable
// while developing; the admin role check replaces this guard.
export default function Page() {
  if (process.env.NODE_ENV === 'production') {
    notFound()
  }

  return <DesignSystemPage />
}
