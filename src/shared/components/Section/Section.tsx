import type { ReactNode } from 'react'

import { PanelRow, type PanelVariant } from '@/shared/components/PanelRow/PanelRow'
import { classNames } from '@/shared/utils/class-names'

import styles from './Section.module.scss'

type SectionProps = {
  id?: string
  variant?: Exclude<PanelVariant, 'striped'>
  panelClassName?: string
  className?: string
  children: ReactNode
}

export function Section({ id, variant, panelClassName, className, children }: SectionProps) {
  return (
    <PanelRow as="section" id={id} variant={variant} className={panelClassName}>
      <div className={classNames(styles.content, className)}>{children}</div>
    </PanelRow>
  )
}
