'use client'

import { useUserProfile } from '@/shared/hooks/useUserProfile'
import { classNames } from '@/shared/utils/class-names'
import { getInitials } from '@/shared/utils/get-initials'

import styles from './UserAvatar.module.scss'

type UserAvatarProps = {
  size?: 'md' | 'xl'
}

// Decorative: the user's name is always shown or announced next to it.
export function UserAvatar({ size = 'md' }: UserAvatarProps) {
  const { profile } = useUserProfile()

  return (
    <span className={classNames(styles.avatar, styles[size])} aria-hidden="true">
      {profile.photoUrl ? (
        // A data URL picked by the user; next/image has nothing to optimize here.
        <img src={profile.photoUrl} alt="" className={styles.photo} />
      ) : (
        getInitials(profile.fullName)
      )}
    </span>
  )
}
