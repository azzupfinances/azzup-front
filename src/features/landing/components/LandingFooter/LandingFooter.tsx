import Link from 'next/link'

import { FOOTER_LINK_GROUPS } from '@/features/landing/constants/landing-content'
import { PanelRow } from '@/shared/components/PanelRow/PanelRow'
import { Text } from '@/shared/components/Text/Text'

import styles from './LandingFooter.module.scss'

export function LandingFooter() {
  const currentYear = new Date().getFullYear()

  return (
    <PanelRow as="footer">
      <div className={styles.content}>
        <div className={styles.brand}>
          <Link href="/" className={styles.logo}>
            Azzup
          </Link>
          <Text size="sm">Tudo o que você precisa, em um só lugar.</Text>
          <Text size="sm" tone="muted">
            © {currentYear} Azzup. Todos os direitos reservados.
          </Text>
        </div>

        {FOOTER_LINK_GROUPS.map((group) => (
          <nav key={group.title} aria-label={group.title} className={styles.group}>
            <h3 className={styles.groupTitle}>{group.title}</h3>
            <ul className={styles.links}>
              {group.links.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className={styles.link}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
    </PanelRow>
  )
}
