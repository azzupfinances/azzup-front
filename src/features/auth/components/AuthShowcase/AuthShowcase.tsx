'use client'

import { useState, type ComponentType } from 'react'

import { BillsScene } from '@/features/auth/components/BillsScene/BillsScene'
import { DashboardScene } from '@/features/auth/components/DashboardScene/DashboardScene'
import { SHOWCASE_SLIDES } from '@/features/auth/constants/auth-showcase'
import type { ShowcaseSlideId } from '@/features/auth/types/auth-showcase.types'
import { classNames } from '@/shared/utils/class-names'

import styles from './AuthShowcase.module.scss'

type SceneProps = {
  isActive: boolean
}

const SCENES: Record<ShowcaseSlideId, ComponentType<SceneProps>> = {
  dashboard: DashboardScene,
  bills: BillsScene,
}

// Product carousel beside the auth form. Autoplay is driven by the active dot's progress
// animation, so hovering (which pauses it) and reduced motion (which removes it) need no timers.
export function AuthShowcase() {
  const [activeIndex, setActiveIndex] = useState(0)

  function handleNextSlide() {
    setActiveIndex((index) => (index + 1) % SHOWCASE_SLIDES.length)
  }

  return (
    <aside className={styles.showcase} aria-label="Conheça a plataforma">
      {SHOWCASE_SLIDES.map((slide, index) => {
        const Scene = SCENES[slide.id]
        const isActive = index === activeIndex

        return (
          <div
            key={slide.id}
            className={classNames(styles.slide, isActive && styles.isActive)}
            aria-hidden={!isActive}
          >
            <div className={styles.scene}>
              <Scene isActive={isActive} />
            </div>

            <div className={styles.caption}>
              <h2 className={styles.title}>
                <span className={styles.highlightedTitle}>{slide.highlightedTitle}</span>
                <span>{slide.title}</span>
              </h2>
              <p className={styles.description}>{slide.description}</p>
            </div>
          </div>
        )
      })}

      <div className={styles.dots}>
        {SHOWCASE_SLIDES.map((slide, index) => {
          const isActive = index === activeIndex

          return (
            <button
              key={slide.id}
              type="button"
              className={classNames(styles.dot, isActive && styles.isActiveDot)}
              aria-label={`Mostrar destaque ${index + 1}`}
              aria-current={isActive || undefined}
              onClick={() => setActiveIndex(index)}
            >
              {isActive && (
                <span className={styles.dotProgress} onAnimationEnd={handleNextSlide} />
              )}
            </button>
          )
        })}
      </div>
    </aside>
  )
}
