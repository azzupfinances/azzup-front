import { CURRENT_USER } from '@/features/app-shell/constants/navigation'

import styles from './UserAvatar.module.scss'

export function UserAvatar() {
  return (
    <span className={styles.avatar} aria-hidden="true">
      {CURRENT_USER.initials}
    </span>
  )
}
