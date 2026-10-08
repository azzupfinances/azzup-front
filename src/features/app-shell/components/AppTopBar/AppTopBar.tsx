import Link from 'next/link'

import { UserAvatar } from '@/features/app-shell/components/UserAvatar/UserAvatar'
import { Logo } from '@/shared/components/Logo/Logo'
import { ThemeToggle } from '@/shared/components/ThemeToggle/ThemeToggle'
import { PROFILE_HREF } from '@/shared/constants/routes'

import styles from './AppTopBar.module.scss'

// Phone and tablet header (below `lg`); the sidebar takes its place on desktop.
export function AppTopBar() {
  return (
    <header className={styles.topBar}>
      <Logo />

      <div className={styles.actions}>
        <ThemeToggle />
        <Link href={PROFILE_HREF} className={styles.profileLink} aria-label="Perfil">
          <UserAvatar />
        </Link>
      </div>
    </header>
  )
}
