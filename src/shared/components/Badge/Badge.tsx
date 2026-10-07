import type { ReactNode } from 'react'

import { classNames } from '@/shared/utils/class-names'

import styles from './Badge.module.scss'

type BadgeProps = {
  className?: string
  children: ReactNode
}

export function Badge({ className, children }: BadgeProps) {
  return <span className={classNames(styles.badge, className)}>{children}</span>
}
