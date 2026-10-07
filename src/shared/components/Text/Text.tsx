import type { ReactNode } from 'react'

import { classNames } from '@/shared/utils/class-names'

import styles from './Text.module.scss'

type TextProps = {
  as?: 'p' | 'span'
  size?: 'sm' | 'md' | 'lg'
  tone?: 'default' | 'muted'
  align?: 'left' | 'center'
  className?: string
  children: ReactNode
}

export function Text({
  as: Tag = 'p',
  size = 'md',
  tone = 'default',
  align = 'left',
  className,
  children,
}: TextProps) {
  return (
    <Tag
      className={classNames(
        styles.text,
        styles[size],
        tone === 'muted' && styles.muted,
        align === 'center' && styles.center,
        className,
      )}
    >
      {children}
    </Tag>
  )
}
