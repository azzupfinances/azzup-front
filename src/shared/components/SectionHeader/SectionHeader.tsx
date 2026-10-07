import type { ReactNode } from 'react'

import { Badge } from '@/shared/components/Badge/Badge'
import { Heading } from '@/shared/components/Heading/Heading'
import { Text } from '@/shared/components/Text/Text'
import { classNames } from '@/shared/utils/class-names'

import styles from './SectionHeader.module.scss'

type SectionHeaderProps = {
  eyebrow?: string
  title: ReactNode
  description?: string
  align?: 'left' | 'center'
}

export function SectionHeader({ eyebrow, title, description, align = 'left' }: SectionHeaderProps) {
  return (
    <header className={classNames(styles.sectionHeader, align === 'center' && styles.center)}>
      {eyebrow && <Badge>{eyebrow}</Badge>}
      <Heading align={align}>{title}</Heading>
      {description && (
        <Text size="lg" align={align}>
          {description}
        </Text>
      )}
    </header>
  )
}
