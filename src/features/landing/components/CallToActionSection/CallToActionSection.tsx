import { Check } from 'lucide-react'

import { Button } from '@/shared/components/Button/Button'
import { Heading } from '@/shared/components/Heading/Heading'
import { IconCircle } from '@/shared/components/IconCircle/IconCircle'
import { Reveal } from '@/shared/components/Reveal/Reveal'
import { Section } from '@/shared/components/Section/Section'
import { Text } from '@/shared/components/Text/Text'
import { SIGN_UP_HREF } from '@/shared/constants/routes'

import styles from './CallToActionSection.module.scss'

export function CallToActionSection() {
  return (
    <Section id="cta" variant="accent" className={styles.content}>
      <Reveal className={styles.copy}>
        <Heading>Você chegou no fim da página.</Heading>
        <Text size="lg">
          Se chegou até aqui, é porque se interessou. Então vai lá, aproveite o preço de lançamento.
        </Text>
        <Button href={SIGN_UP_HREF} variant="secondary" hasArrow className={styles.action}>
          Assinar agora
        </Button>
      </Reveal>

      <div className={styles.decoration} aria-hidden="true">
        <div className={styles.notification}>
          <IconCircle>
            <Check size={18} />
          </IconCircle>
          <div className={styles.notificationText}>
            <span className={styles.notificationTitle}>Conta criada!</span>
            <span className={styles.notificationDescription}>Tudo pronto para começar.</span>
          </div>
        </div>
      </div>
    </Section>
  )
}
