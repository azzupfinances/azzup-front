import type { Metadata } from 'next'
import type { ReactNode } from 'react'

import { SystemThemeScope } from '@/shared/components/SystemThemeScope/SystemThemeScope'

export const metadata: Metadata = {
  robots: { index: false },
}

type SystemLayoutProps = {
  children: ReactNode
}

// Logged-in system. The app shell and session guard will be mounted here.
export default function SystemLayout({ children }: SystemLayoutProps) {
  return (
    <>
      <SystemThemeScope />
      {children}
    </>
  )
}
