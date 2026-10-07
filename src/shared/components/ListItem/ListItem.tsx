import type { LucideIcon } from 'lucide-react'
import Link from 'next/link'
import type { ReactNode } from 'react'

import { classNames } from '@/shared/utils/class-names'

import styles from './ListItem.module.scss'

type ListItemProps = {
  icon?: LucideIcon
  iconTone?: 'default' | 'success' | 'warning' | 'danger'
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
  title,
  description,
  trailing,
  trailingDetail,
  href,
  onClick,
}: ListItemProps) {
  const content = (
    <>
      {Icon && (
        <span className={classNames(styles.icon, styles[iconTone])} aria-hidden="true">
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
