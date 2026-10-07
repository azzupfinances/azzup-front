import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'

import { classNames } from '@/shared/utils/class-names'

import styles from './EmptyState.module.scss'

type EmptyStateProps = {
  icon: LucideIcon
  title: string
  description?: string
  tone?: 'default' | 'danger'
  action?: ReactNode
  className?: string
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  tone = 'default',
  action,
  className,
}: EmptyStateProps) {
  return (
    <div className={classNames(styles.emptyState, styles[tone], className)}>
      <span className={styles.icon} aria-hidden="true">
        <Icon size={24} />
      </span>
      <div className={styles.text}>
        <p className={styles.title}>{title}</p>
        {description && <p className={styles.description}>{description}</p>}
      </div>
      {action}
    </div>
  )
}
