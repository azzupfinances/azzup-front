import type { ReactNode } from 'react'

import { classNames } from '@/shared/utils/class-names'

import styles from './IconCircle.module.scss'

type IconCircleProps = {
  variant?: 'soft' | 'translucent'
  className?: string
  children: ReactNode
}

export function IconCircle({ variant = 'soft', className, children }: IconCircleProps) {
  return (
    <span className={classNames(styles.iconCircle, styles[variant], className)} aria-hidden="true">
      {children}
    </span>
  )
}
