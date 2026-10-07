import type { ReactNode } from 'react'

import { AuthShowcase } from '@/features/auth/components/AuthShowcase/AuthShowcase'
import { Logo } from '@/shared/components/Logo/Logo'

import styles from './AuthLayout.module.scss'

type AuthLayoutProps = {
  children: ReactNode
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className={styles.layout}>
      <main className={styles.main}>
        <div className={styles.content}>
          <Logo className={styles.logo} />
          {children}
        </div>
      </main>
      <AuthShowcase />
    </div>
  )
}
