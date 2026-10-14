import type { ReactNode } from 'react'

import styles from './ProfileSection.module.scss'

type ProfileSectionProps = {
  title: string
  description?: string
  // Section actions, such as a submit button pointing at the form by its id.
  footer?: ReactNode
  children: ReactNode
}

// Bordered block of the profile screen; each one saves on its own.
export function ProfileSection({ title, description, footer, children }: ProfileSectionProps) {
  return (
    <section className={styles.section}>
      <header className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        {description && <p className={styles.description}>{description}</p>}
      </header>
      {children}
      {footer && <footer className={styles.footer}>{footer}</footer>}
    </section>
  )
}
