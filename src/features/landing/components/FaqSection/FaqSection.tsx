import { FAQ_ITEMS } from '@/features/landing/constants/landing-content'
import { Accordion } from '@/shared/components/Accordion/Accordion'
import { Heading } from '@/shared/components/Heading/Heading'
import { HighlightText } from '@/shared/components/HighlightText/HighlightText'
import { Reveal } from '@/shared/components/Reveal/Reveal'
import { Section } from '@/shared/components/Section/Section'
import { Text } from '@/shared/components/Text/Text'
import { TextLink } from '@/shared/components/TextLink/TextLink'

import styles from './FaqSection.module.scss'

const ACCORDION_ITEMS = FAQ_ITEMS.map((faq) => ({
  id: faq.id,
  title: faq.question,
  content: faq.answer,
}))

export function FaqSection() {
  return (
    <Section id="faq" className={styles.content}>
      <div className={styles.intro}>
        <Heading>
          Tem dúvidas? <HighlightText>A gente responde.</HighlightText>
        </Heading>
        <Text size="lg">
          Separamos as perguntas mais comuns. Se a sua não estiver aqui, é só chamar.
        </Text>
        <TextLink href="#cta">Fale com a gente</TextLink>
      </div>

      <Reveal>
        <Accordion items={ACCORDION_ITEMS} />
      </Reveal>
    </Section>
  )
}
