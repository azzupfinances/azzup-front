'use client'

import { UserAvatar } from '@/shared/components/UserAvatar/UserAvatar'
import { useUserProfile } from '@/shared/hooks/useUserProfile'

import styles from './SidebarUser.module.scss'

export function SidebarUser() {
  const { profile } = useUserProfile()

  return (
    <div className={styles.user}>
      <UserAvatar />
      <span className={styles.userText}>
        <span className={styles.userName}>{profile.fullName}</span>
        <span className={styles.userEmail}>{profile.email}</span>
      </span>
    </div>
  )
}
