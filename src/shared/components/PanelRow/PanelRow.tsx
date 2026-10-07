import type { ReactNode } from 'react'

import { classNames } from '@/shared/utils/class-names'

import styles from './PanelRow.module.scss'

export type PanelVariant = 'default' | 'inverted' | 'accent' | 'striped'

type PanelRowProps = {
  as?: 'div' | 'section' | 'header' | 'footer'
  id?: string
  variant?: PanelVariant
  hasStripedSides?: boolean
  isDecorative?: boolean
  className?: string
  children?: ReactNode
}

// One row of the panel layout: a centered content panel flanked by two side panels.
// Rows are stacked with a 1px gap so the page background reads as grid lines.
export function PanelRow({
  as: Tag = 'div',
  id,
  variant = 'default',
  hasStripedSides = false,
  isDecorative = false,
  className,
  children,
}: PanelRowProps) {
  return (
    <Tag
      id={id}
      aria-hidden={isDecorative || undefined}
      className={classNames(styles.row, hasStripedSides && styles.stripedSides)}
    >
      <div className={styles.side} />
      <div className={classNames(styles.center, styles[variant], className)}>{children}</div>
      <div className={styles.side} />
    </Tag>
  )
}
