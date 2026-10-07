'use client'

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'

import { classNames } from '@/shared/utils/class-names'

import styles from './Reveal.module.scss'

type RevealProps = {
  delay?: number
  className?: string
  children: ReactNode
}

// Fades content in once it enters the viewport. Children may remain Server Components.
export function Reveal({ delay = 0, className, children }: RevealProps) {
  const elementRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const element = elementRef.current

    if (!element) {
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15 },
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={elementRef}
      className={classNames(styles.reveal, isVisible && styles.visible, className)}
      style={{ '--reveal-delay': `${delay}ms` } as CSSProperties}
    >
      {children}
    </div>
  )
}
