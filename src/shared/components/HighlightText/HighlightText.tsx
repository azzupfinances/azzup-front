import type { ReactNode } from 'react'

import { classNames } from '@/shared/utils/class-names'

import styles from './HighlightText.module.scss'

type HighlightTextProps = {
  className?: string
  children: ReactNode
}

// Colored text with a slow light sheen passing over it.
export function HighlightText({ className, children }: HighlightTextProps) {
  return <span className={classNames(styles.highlight, className)}>{children}</span>
}
