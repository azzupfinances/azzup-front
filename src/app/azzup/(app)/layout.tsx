import type { ReactNode } from 'react'

import { AppShell } from '@/features/app-shell/components/AppShell/AppShell'
import { CreditCardsProvider } from '@/shared/components/CreditCardsProvider/CreditCardsProvider'
import { UserProfileProvider } from '@/shared/components/UserProfileProvider/UserProfileProvider'

type AppLayoutProps = {
  children: ReactNode
}

// Screens with the system navigation. No session guard yet (visual phase).
export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <UserProfileProvider>
      <CreditCardsProvider>
        <AppShell>{children}</AppShell>
      </CreditCardsProvider>
    </UserProfileProvider>
  )
}
