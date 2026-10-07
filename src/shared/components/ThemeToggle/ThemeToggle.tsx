'use client'

import { Moon, Sun } from 'lucide-react'

import { getTheme, setTheme } from '@/lib/theme/theme'
import { classNames } from '@/shared/utils/class-names'

import styles from './ThemeToggle.module.scss'

type ThemeToggleProps = {
  className?: string
}

// Both icons are rendered and CSS shows the right one from `data-theme`, so the server
// markup never depends on the stored theme (no hydration mismatch).
export function ThemeToggle({ className }: ThemeToggleProps) {
  function handleToggle() {
    setTheme(getTheme() === 'dark' ? 'light' : 'dark')
  }

  return (
    <button
      type="button"
      className={classNames(styles.toggle, className)}
      aria-label="Alternar tema claro/escuro"
      title="Alternar tema claro/escuro"
      onClick={handleToggle}
    >
      <Moon size={20} className={styles.moonIcon} aria-hidden="true" />
      <Sun size={20} className={styles.sunIcon} aria-hidden="true" />
    </button>
  )
}
