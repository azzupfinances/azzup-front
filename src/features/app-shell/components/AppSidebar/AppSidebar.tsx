import { LogOut } from 'lucide-react'
import Link from 'next/link'

import { NavLink } from '@/features/app-shell/components/NavLink/NavLink'
import { NewTransactionButton } from '@/features/app-shell/components/NewTransactionButton/NewTransactionButton'
import { UserAvatar } from '@/features/app-shell/components/UserAvatar/UserAvatar'
import { CURRENT_USER, NAVIGATION_ITEMS } from '@/features/app-shell/constants/navigation'
import { Logo } from '@/shared/components/Logo/Logo'
import { ThemeToggle } from '@/shared/components/ThemeToggle/ThemeToggle'
import { SIGN_IN_HREF } from '@/shared/constants/routes'

import styles from './AppSidebar.module.scss'

// Desktop navigation (from `lg` up).
export function AppSidebar() {
  return (
    <aside className={styles.sidebar}>
      <Logo className={styles.logo} />

      <NewTransactionButton variant="sidebar" />

      <nav aria-label="Menu principal">
        <ul className={styles.navList}>
          {NAVIGATION_ITEMS.map((item) => (
            <li key={item.href}>
              <NavLink
                href={item.href}
                label={item.label}
                icon={<item.icon size={20} aria-hidden="true" />}
                variant="sidebar"
              />
            </li>
          ))}
        </ul>
      </nav>

      <div className={styles.footer}>
        <div className={styles.user}>
          <UserAvatar />
          <span className={styles.userText}>
            <span className={styles.userName}>{CURRENT_USER.name}</span>
            <span className={styles.userEmail}>{CURRENT_USER.email}</span>
          </span>
        </div>

        <div className={styles.actions}>
          <ThemeToggle />
          {/* Pending backend integration: end the session before leaving. */}
          <Link href={SIGN_IN_HREF} className={styles.logout}>
            <LogOut size={18} aria-hidden="true" />
            Sair
          </Link>
        </div>
      </div>
    </aside>
  )
}
