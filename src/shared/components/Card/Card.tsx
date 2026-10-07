import type { ReactNode } from 'react'

import { classNames } from '@/shared/utils/class-names'

import styles from './Card.module.scss'

type CardProps = {
  as?: 'div' | 'article' | 'li'
  variant?: 'default' | 'translucent'
  isInteractive?: boolean
  className?: string
  children: ReactNode
}

export function Card({
  as: Tag = 'div',
  variant = 'default',
  isInteractive = false,
  className,
  children,
}: CardProps) {
  return (
    <Tag
      className={classNames(
        styles.card,
        styles[variant],
        isInteractive && styles.interactive,
        className,
      )}
    >
      {children}
    </Tag>
  )
}
