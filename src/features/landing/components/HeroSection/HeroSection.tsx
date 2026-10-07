import { HeroMockup } from '@/features/landing/components/HeroMockup/HeroMockup'
import { HERO_HIGHLIGHTS } from '@/features/landing/constants/landing-content'
import { Badge } from '@/shared/components/Badge/Badge'
import { Button } from '@/shared/components/Button/Button'
import { Heading } from '@/shared/components/Heading/Heading'
import { HighlightText } from '@/shared/components/HighlightText/HighlightText'
import { IconCircle } from '@/shared/components/IconCircle/IconCircle'
import { Reveal } from '@/shared/components/Reveal/Reveal'
import { Section } from '@/shared/components/Section/Section'
import { Text } from '@/shared/components/Text/Text'
import { SIGN_UP_HREF } from '@/shared/constants/routes'

import styles from './HeroSection.module.scss'

export function HeroSection() {
  return (
    <Section panelClassName={styles.panel} className={styles.content}>
      <Reveal className={styles.copy}>
        <Badge>
          Novidade: <span className={styles.badgeDetail}>uma nova forma de organizar sua rotina.</span>
        </Badge>

        <Heading as="h1" size="xl" className={styles.title}>
          <span className={styles.titleLine}>Tudo o que você precisa.</span>
          <HighlightText className={styles.titleLine}>Em um só lugar.</HighlightText>
        </Heading>

        <Text size="lg">
          Organize, acompanhe e evolua com uma plataforma simples, rápida e feita para o seu dia a
          dia.
        </Text>

        <div className={styles.actions}>
          <Button href={SIGN_UP_HREF} hasArrow className={styles.primaryAction}>
            Começar agora
          </Button>
          <Button href="#features" variant="outline" className={styles.secondaryAction}>
            Conhecer recursos
          </Button>
        </div>

        <ul className={styles.highlights}>
          {HERO_HIGHLIGHTS.map((highlight) => (
            <li key={highlight.title} className={styles.highlight}>
              <IconCircle>
                <highlight.icon size={18} />
              </IconCircle>
              <div className={styles.highlightText}>
                <span className={styles.highlightTitle}>{highlight.title}</span>
                <span className={styles.highlightDescription}>{highlight.description}</span>
              </div>
            </li>
          ))}
        </ul>
      </Reveal>

      <HeroMockup />
    </Section>
  )
}
