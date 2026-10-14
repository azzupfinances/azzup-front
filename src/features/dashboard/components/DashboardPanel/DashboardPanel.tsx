import Link from 'next/link'
import type { ReactNode } from 'react'

import { classNames } from '@/shared/utils/class-names'

import styles from './DashboardPanel.module.scss'

type DashboardPanelProps = {
  title: string
  action?: { label: string; href: string }
  // Limits the panel's list to its first items on phones.
  isCompactOnPhone?: boolean
  className?: string
  children: ReactNode
}

// Titled block of the dashboard grid, with an optional "see all" link.
export function DashboardPanel({ title, action, isCompactOnPhone = false, className, children }: DashboardPanelProps) {
  return (
    <section className={classNames(styles.panel, isCompactOnPhone && styles.isCompactOnPhone, className)}>
      <header className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        {action && (
          <Link href={action.href} className={styles.action}>
            {action.label}
          </Link>
        )}
      </header>
      {children}
    </section>
  )
}
