import { PricingPlans } from '@/features/landing/components/PricingPlans/PricingPlans'
import { HighlightText } from '@/shared/components/HighlightText/HighlightText'
import { Section } from '@/shared/components/Section/Section'
import { SectionHeader } from '@/shared/components/SectionHeader/SectionHeader'

export function PricingSection() {
  return (
    <Section id="pricing">
      <SectionHeader
        eyebrow="Planos"
        title={
          <>
            Escolha seu <HighlightText>plano.</HighlightText>
          </>
        }
        description="Um plano completo, com preço especial de lançamento nos 3 primeiros meses."
      />

      <PricingPlans />
    </Section>
  )
}
