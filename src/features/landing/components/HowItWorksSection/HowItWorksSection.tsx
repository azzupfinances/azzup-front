import { STEP_ITEMS } from '@/features/landing/constants/landing-content'
import { Card } from '@/shared/components/Card/Card'
import { Heading } from '@/shared/components/Heading/Heading'
import { HighlightText } from '@/shared/components/HighlightText/HighlightText'
import { IconCircle } from '@/shared/components/IconCircle/IconCircle'
import { Reveal } from '@/shared/components/Reveal/Reveal'
import { Section } from '@/shared/components/Section/Section'
import { SectionHeader } from '@/shared/components/SectionHeader/SectionHeader'
import { Text } from '@/shared/components/Text/Text'

import styles from './HowItWorksSection.module.scss'

const STAGGER_DELAY_MS = 150

export function HowItWorksSection() {
  return (
    <Section id="how-it-works" variant="inverted">
      <SectionHeader
        title={
          <>
            Comece em <HighlightText>três passos.</HighlightText>
          </>
        }
        description="Do cadastro aos primeiros resultados em poucos minutos."
      />

      <ol className={styles.steps}>
        {STEP_ITEMS.map((step, index) => (
          <li key={step.title}>
            <Reveal delay={index * STAGGER_DELAY_MS} className={styles.step}>
              <Card variant="translucent" isInteractive className={styles.card}>
                <div className={styles.cardHeader}>
                  <IconCircle variant="translucent">
                    <step.icon size={18} />
                  </IconCircle>
                  <span className={styles.stepNumber}>Passo {index + 1}</span>
                </div>
                <Heading as="h3" size="sm">
                  {step.title}
                </Heading>
                <Text>{step.description}</Text>
              </Card>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  )
}
