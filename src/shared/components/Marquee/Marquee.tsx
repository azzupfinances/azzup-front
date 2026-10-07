import type { CSSProperties, ReactNode } from 'react'

import { classNames } from '@/shared/utils/class-names'

import styles from './Marquee.module.scss'

type MarqueeProps = {
  label: string
  durationInSeconds?: number
  className?: string
  children: ReactNode
}

// CSS-only infinite scroll: the content is rendered twice and the track moves by -50%,
// which loops seamlessly without JavaScript. Only `transform` is animated, so it stays on the GPU.
export function Marquee({ label, durationInSeconds = 60, className, children }: MarqueeProps) {
  return (
    <div className={classNames(styles.viewport, className)}>
      <div
        className={styles.track}
        style={{ '--marquee-duration': `${durationInSeconds}s` } as CSSProperties}
      >
        <div role="list" aria-label={label} className={styles.group}>
          {children}
        </div>
        <div aria-hidden="true" inert className={classNames(styles.group, styles.duplicate)}>
          {children}
        </div>
      </div>
    </div>
  )
}
