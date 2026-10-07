import type { ReactNode } from 'react'

import { Heading } from '@/shared/components/Heading/Heading'
import { Text } from '@/shared/components/Text/Text'

import styles from './AuthPageHeader.module.scss'

type AuthPageHeaderProps = {
  title: string
  description: ReactNode
}

export function AuthPageHeader({ title, description }: AuthPageHeaderProps) {
  return (
    <header className={styles.header}>
      <Heading as="h1" size="md" align="center">
        {title}
      </Heading>
      <Text align="center" className={styles.description}>
        {description}
      </Text>
    </header>
  )
}
