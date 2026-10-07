import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

import { Heading } from '@/shared/components/Heading/Heading'
import { HighlightText } from '@/shared/components/HighlightText/HighlightText'
import { PanelRow } from '@/shared/components/PanelRow/PanelRow'
import { Text } from '@/shared/components/Text/Text'

import styles from './DemoLinkSection.module.scss'

// The whole panel is a single link, highlighted on hover.
export function DemoLinkSection() {
  return (
    <PanelRow>
      <Link href="#how-it-works" className={styles.link}>
        <div className={styles.copy}>
          <Heading>
            <HighlightText>Quer ver funcionando?</HighlightText>
          </Heading>
          <Text size="lg">Veja em poucos passos como tudo se conecta. Sem complicação.</Text>
        </div>

        <span className={styles.action}>
          Ver como funciona
          <ArrowRight size={20} aria-hidden="true" />
        </span>

        <span className={styles.dots} aria-hidden="true" />
      </Link>
    </PanelRow>
  )
}
