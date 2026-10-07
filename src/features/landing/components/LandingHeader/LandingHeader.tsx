import { NAVIGATION_LINKS } from '@/features/landing/constants/landing-content'
import { Button } from '@/shared/components/Button/Button'
import { Logo } from '@/shared/components/Logo/Logo'
import { PanelRow } from '@/shared/components/PanelRow/PanelRow'
import { SIGN_IN_HREF } from '@/shared/constants/routes'

import styles from './LandingHeader.module.scss'

export function LandingHeader() {
  return (
    <PanelRow as="header" hasStripedSides className={styles.panel}>
      <div className={styles.content}>
        <Logo />

        <nav aria-label="Navegação principal" className={styles.navigation}>
          {NAVIGATION_LINKS.map((link) => (
            <a key={link.href} href={link.href} className={styles.navigationLink}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className={styles.actions}>
          <span className={styles.separator} aria-hidden="true" />
          <Button href={SIGN_IN_HREF} hasArrow>
            Acessar plataforma
          </Button>
        </div>
      </div>
    </PanelRow>
  )
}
