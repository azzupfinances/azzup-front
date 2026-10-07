import Link from 'next/link'

import { classNames } from '@/shared/utils/class-names'

import styles from './Logo.module.scss'

type LogoProps = {
  className?: string
}

export function Logo({ className }: LogoProps) {
  return (
    <Link href="/" className={classNames(styles.logo, className)}>
      Azzup
    </Link>
  )
}
