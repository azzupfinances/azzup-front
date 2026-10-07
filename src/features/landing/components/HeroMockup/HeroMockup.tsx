import type { CSSProperties } from 'react'

import styles from './HeroMockup.module.scss'

const CHART_BAR_HEIGHTS = [38, 62, 48, 80, 56, 92, 70, 100]

// Decorative product illustration. Placeholder shapes are drawn with CSS backgrounds,
// so the markup only holds the structural blocks.
export function HeroMockup() {
  return (
    <div className={styles.mockup} aria-hidden="true">
      <div className={styles.desktop}>
        <div className={styles.windowBar} />

        <div className={styles.desktopBody}>
          <div className={styles.sidebar} />

          <div className={styles.dashboard}>
            <div className={styles.statCards}>
              <div className={styles.statCard} />
              <div className={styles.statCard} />
              <div className={styles.statCard} />
            </div>

            <div className={styles.chart}>
              {CHART_BAR_HEIGHTS.map((height) => (
                <span
                  key={height}
                  className={styles.chartBar}
                  style={{ '--bar-height': `${height}%` } as CSSProperties}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className={styles.mobile}>
        <div className={styles.mobileBalance} />
        <div className={styles.mobileList} />
      </div>
    </div>
  )
}
