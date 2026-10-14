import { ChevronRight, type LucideIcon } from 'lucide-react'
import Link from 'next/link'
import type { CSSProperties, ReactNode } from 'react'

import { classNames } from '@/shared/utils/class-names'

import styles from './ListItem.module.scss'

type ListItemProps = {
  icon?: LucideIcon
  iconTone?: 'default' | 'success' | 'warning' | 'danger'
  // Custom icon colors (e.g. a spending category); wins over `iconTone`.
  iconColor?: { color: string; softColor: string }
  title: string
  description?: string
  trailing?: ReactNode
  trailingDetail?: ReactNode
  // A row is either a link, a button or static content.
  href?: string
  onClick?: () => void
}

export function ListItem({
  icon: Icon,
  iconTone = 'default',
  iconColor,
  title,
  description,
  trailing,
  trailingDetail,
  href,
  onClick,
}: ListItemProps) {
  const isInteractive = Boolean(href ?? onClick)

  const content = (
    <>
      {Icon && (
        <span
          className={classNames(styles.icon, iconColor ? styles.custom : styles[iconTone])}
          style={
            iconColor && ({ '--icon-color': iconColor.color, '--icon-color-soft': iconColor.softColor } as CSSProperties)
          }
          aria-hidden="true"
        >
          <Icon size={18} />
        </span>
      )}
      <span className={styles.text}>
        <span className={styles.title}>{title}</span>
        {description && <span className={styles.description}>{description}</span>}
      </span>
      {(trailing || trailingDetail) && (
        <span className={styles.trailing}>
          {trailing}
          {trailingDetail && <span className={styles.trailingDetail}>{trailingDetail}</span>}
        </span>
      )}
      {/* Signals that the row opens something; static rows have no chevron. */}
      {isInteractive && <ChevronRight size={18} className={styles.chevron} aria-hidden="true" />}
    </>
  )

  return (
    <li>
      {href ? (
        <Link href={href} className={classNames(styles.row, styles.interactive)}>
          {content}
        </Link>
      ) : onClick ? (
        <button type="button" className={classNames(styles.row, styles.interactive)} onClick={onClick}>
          {content}
        </button>
      ) : (
        <div className={styles.row}>{content}</div>
      )}
    </li>
  )
}
