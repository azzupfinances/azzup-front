import Link from 'next/link'

import styles from './AuthSwitchLink.module.scss'

type AuthSwitchLinkProps = {
  prompt: string
  linkLabel: string
  href: string
}

// Prompt that switches between the sign-in and sign-up screens.
export function AuthSwitchLink({ prompt, linkLabel, href }: AuthSwitchLinkProps) {
  return (
    <p className={styles.text}>
      {prompt}{' '}
      <Link href={href} className={styles.link}>
        {linkLabel}
      </Link>
    </p>
  )
}
