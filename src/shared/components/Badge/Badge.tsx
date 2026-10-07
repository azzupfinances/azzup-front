import type { ReactNode } from 'react'

import { classNames } from '@/shared/utils/class-names'

import styles from './Badge.module.scss'

type BadgeProps = {
  // `neutral` is the outlined marketing badge; the others are soft status badges.
  tone?: 'neutral' | 'info' | 'success' | 'warning' | 'danger'
  className?: string
  children: ReactNode
}

export function Badge({ tone = 'neutral', className, children }: BadgeProps) {
  return <span className={classNames(styles.badge, styles[tone], className)}>{children}</span>
}
