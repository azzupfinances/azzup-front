import type { ReactNode } from 'react'

import styles from './DesignSystemSection.module.scss'

type DesignSystemSectionProps = {
  title: string
  description?: string
  children: ReactNode
}

export function DesignSystemSection({ title, description, children }: DesignSystemSectionProps) {
  return (
    <section className={styles.section}>
      <header className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        {description && <p className={styles.description}>{description}</p>}
      </header>
      <div className={styles.content}>{children}</div>
    </section>
  )
}
