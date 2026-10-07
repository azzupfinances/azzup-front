import { FEATURE_ITEMS } from '@/features/landing/constants/landing-content'
import { Heading } from '@/shared/components/Heading/Heading'
import { HighlightText } from '@/shared/components/HighlightText/HighlightText'
import { IconCircle } from '@/shared/components/IconCircle/IconCircle'
import { Reveal } from '@/shared/components/Reveal/Reveal'
import { Section } from '@/shared/components/Section/Section'
import { SectionHeader } from '@/shared/components/SectionHeader/SectionHeader'
import { Text } from '@/shared/components/Text/Text'

import styles from './FeaturesSection.module.scss'

const STAGGER_DELAY_MS = 120

export function FeaturesSection() {
  return (
    <Section id="features">
      <SectionHeader
        eyebrow="Recursos"
        title={
          <>
            Feito para simplificar <HighlightText>a sua rotina.</HighlightText>
          </>
        }
        description="Ferramentas pensadas para economizar tempo e trazer clareza ao seu trabalho."
      />

      <ul className={styles.grid}>
        {FEATURE_ITEMS.map((feature, index) => (
          <li key={feature.title} className={styles.item}>
            <Reveal delay={index * STAGGER_DELAY_MS}>
              <div className={styles.marker}>
                <span className={styles.accentBar} aria-hidden="true" />
                <IconCircle>
                  <feature.icon size={18} />
                </IconCircle>
              </div>

              <div className={styles.body}>
                <Heading as="h3" size="sm">
                  {feature.title}
                </Heading>
                <Text size="sm">{feature.description}</Text>
              </div>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  )
}
