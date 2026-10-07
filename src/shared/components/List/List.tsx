import type { ReactNode } from 'react'

import { classNames } from '@/shared/utils/class-names'

import styles from './List.module.scss'

type ListProps = {
  label?: string
  className?: string
  children: ReactNode
}

// Card-like container for ListItem rows, separated by dividers.
export function List({ label, className, children }: ListProps) {
  return (
    <ul aria-label={label} className={classNames(styles.list, className)}>
      {children}
    </ul>
  )
}
