import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import type { ReactNode } from 'react'

import { classNames } from '@/shared/utils/class-names'

import styles from './TextLink.module.scss'

type TextLinkProps = {
  href: string
  className?: string
  children: ReactNode
}

export function TextLink({ href, className, children }: TextLinkProps) {
  return (
    <Link href={href} className={classNames(styles.link, className)}>
      <span className={styles.label}>{children}</span>
      <ArrowRight size={16} className={styles.arrow} aria-hidden="true" />
    </Link>
  )
}
