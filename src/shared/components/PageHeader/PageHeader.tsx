import type { ReactNode } from 'react'

import styles from './PageHeader.module.scss'

type PageHeaderProps = {
  title: ReactNode
  description?: string
  actions?: ReactNode
}

// Top of a system screen: title on the left, screen-level controls on the right.
export function PageHeader({ title, description, actions }: PageHeaderProps) {
  return (
    <header className={styles.header}>
      <div>
        <h1 className={styles.title}>{title}</h1>
        {description && <p className={styles.description}>{description}</p>}
      </div>
      {actions && <div className={styles.actions}>{actions}</div>}
    </header>
  )
}
