import type { ReactNode } from 'react'

import { AppBottomNav } from '@/features/app-shell/components/AppBottomNav/AppBottomNav'
import { AppSidebar } from '@/features/app-shell/components/AppSidebar/AppSidebar'
import { AppTopBar } from '@/features/app-shell/components/AppTopBar/AppTopBar'

import styles from './AppShell.module.scss'

type AppShellProps = {
  children: ReactNode
}

// Both navigations are rendered and CSS shows the right one, so the server markup
// does not depend on the screen size.
export function AppShell({ children }: AppShellProps) {
  return (
    <div className={styles.shell}>
      <div className={styles.sidebar}>
        <AppSidebar />
      </div>

      <div className={styles.body}>
        <div className={styles.topBar}>
          <AppTopBar />
        </div>
        <main className={styles.main}>{children}</main>
      </div>

      <div className={styles.bottomNav}>
        <AppBottomNav />
      </div>
    </div>
  )
}
