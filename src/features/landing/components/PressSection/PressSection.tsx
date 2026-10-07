import { Newspaper } from 'lucide-react'

import { PRESS_MENTIONS } from '@/features/landing/constants/landing-content'
import { HighlightText } from '@/shared/components/HighlightText/HighlightText'
import { Marquee } from '@/shared/components/Marquee/Marquee'
import { PanelRow } from '@/shared/components/PanelRow/PanelRow'
import { SectionHeader } from '@/shared/components/SectionHeader/SectionHeader'
import { TextLink } from '@/shared/components/TextLink/TextLink'

import styles from './PressSection.module.scss'

// Uses PanelRow directly (not Section) so the marquee can run edge to edge.
export function PressSection() {
  return (
    <PanelRow as="section" id="press">
      <div className={styles.header}>
        <SectionHeader
          eyebrow="Na mídia"
          title={
            <>
              A Azzup <HighlightText>na mídia.</HighlightText>
            </>
          }
        />
      </div>

      <Marquee label="Matérias sobre a Azzup" className={styles.marquee}>
        {PRESS_MENTIONS.map((mention) => (
          <article key={mention.id} role="listitem" className={styles.item}>
            <div className={styles.itemContent}>
              <span className={styles.source}>
                <Newspaper size={18} aria-hidden="true" />
                {mention.source}
              </span>
              <h3 className={styles.quote}>
                <span className={styles.quoteMark}>“</span>
                {mention.quote}
                <span className={styles.quoteMark}>”</span>
              </h3>
            </div>
            <TextLink href={mention.href}>Ver matéria completa</TextLink>
          </article>
        ))}
      </Marquee>
    </PanelRow>
  )
}
