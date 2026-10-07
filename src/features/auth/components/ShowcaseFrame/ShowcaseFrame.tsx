import type { ReactNode } from 'react'

import { SHOWCASE_NAV_ICONS } from '@/features/auth/constants/auth-showcase'
import { classNames } from '@/shared/utils/class-names'

import styles from './ShowcaseFrame.module.scss'

type ShowcaseFrameProps = {
  activeNavIndex: number
  isActive: boolean
  className?: string
  children: ReactNode
}

// Decorative app window shared by the showcase scenes.
export function ShowcaseFrame({ activeNavIndex, isActive, className, children }: ShowcaseFrameProps) {
  return (
    <div className={classNames(styles.frame, isActive && styles.isActive)} aria-hidden="true">
      <div className={styles.sidebar}>
        <span className={styles.brandMark}>A</span>
        {SHOWCASE_NAV_ICONS.map((Icon, index) => (
          <span
            key={index}
            className={classNames(styles.navItem, index === activeNavIndex && styles.isCurrent)}
          >
            <Icon size={18} />
          </span>
        ))}
      </div>

      <div className={classNames(styles.content, className)}>{children}</div>
    </div>
  )
}
