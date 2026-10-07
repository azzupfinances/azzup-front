import type { CSSProperties } from 'react'

import { classNames } from '@/shared/utils/class-names'

import styles from './Skeleton.module.scss'

type SkeletonProps = {
  width?: string
  height?: string
  shape?: 'line' | 'block' | 'circle'
  className?: string
}

// Loading placeholder. Wrap groups of skeletons in an element with `aria-busy="true"`.
export function Skeleton({ width = '100%', height = '12px', shape = 'line', className }: SkeletonProps) {
  return (
    <span
      aria-hidden="true"
      className={classNames(styles.skeleton, styles[shape], className)}
      style={{ '--skeleton-width': width, '--skeleton-height': height } as CSSProperties}
    />
  )
}
