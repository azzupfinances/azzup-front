'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { ReactNode } from 'react'

import { classNames } from '@/shared/utils/class-names'

import styles from './NavLink.module.scss'

type NavLinkProps = {
  href: string
  label: string
  // Rendered element, because icon components cannot be passed from the server.
  icon: ReactNode
  // `sidebar` is the desktop row; `tab` is the stacked icon + label of the bottom navigation.
  variant: 'sidebar' | 'tab'
}

export function NavLink({ href, label, icon, variant }: NavLinkProps) {
  const pathname = usePathname()
  const isCurrent = pathname === href || pathname.startsWith(`${href}/`)

  return (
    <Link
      href={href}
      className={classNames(styles.link, styles[variant], isCurrent && styles.isCurrent)}
      aria-current={isCurrent ? 'page' : undefined}
    >
      {icon}
      <span className={styles.label}>{label}</span>
    </Link>
  )
}
