import type { ReactNode } from 'react'

import { classNames } from '@/shared/utils/class-names'

import styles from './Heading.module.scss'

type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4'
type HeadingSize = 'sm' | 'md' | 'lg' | 'xl'

type HeadingProps = {
  as?: HeadingLevel
  size?: HeadingSize
  align?: 'left' | 'center'
  className?: string
  children: ReactNode
}

// Semantic level (`as`) and visual size are independent to keep the document outline correct.
export function Heading({
  as: Tag = 'h2',
  size = 'lg',
  align = 'left',
  className,
  children,
}: HeadingProps) {
  return (
    <Tag
      className={classNames(
        styles.heading,
        styles[size],
        align === 'center' && styles.center,
        className,
      )}
    >
      {children}
    </Tag>
  )
}
