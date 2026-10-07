import { Check, Clock } from 'lucide-react'

import { SIGN_UP_HREF } from '@/features/landing/constants/landing-content'
import type {
  BillingCycle,
  PlanPricing,
  PricingPlan,
} from '@/features/landing/types/landing.types'
import {
  formatPriceInCents,
  getYearlyDiscountPercentage,
  getYearlyMonthlyEquivalentInCents,
  splitPriceInCents,
} from '@/features/landing/utils/pricing'
import { Badge } from '@/shared/components/Badge/Badge'
import { Button } from '@/shared/components/Button/Button'
import { Text } from '@/shared/components/Text/Text'
import { classNames } from '@/shared/utils/class-names'

import styles from './PricingCard.module.scss'

type PricingCardProps = {
  plan: PricingPlan
  billingCycle: BillingCycle
}

export function PricingCard({ plan, billingCycle }: PricingCardProps) {
  if (plan.status === 'coming-soon' || !plan.pricing) {
    return <ComingSoonCard plan={plan} />
  }

  return <AvailableCard plan={plan} pricing={plan.pricing} billingCycle={billingCycle} />
}

type AvailableCardProps = {
  plan: PricingPlan
  pricing: PlanPricing
  billingCycle: BillingCycle
}

function AvailableCard({ plan, pricing, billingCycle }: AvailableCardProps) {
  const isYearly = billingCycle === 'yearly'
  const introductoryOffer = isYearly ? undefined : pricing.introductoryOffer

  const displayedPriceInCents = isYearly
    ? getYearlyMonthlyEquivalentInCents(pricing)
    : (introductoryOffer?.priceInCents ?? pricing.monthlyPriceInCents)
  const { integer, cents } = splitPriceInCents(displayedPriceInCents)

  const badgeLabel = isYearly
    ? `Economize ${getYearlyDiscountPercentage(pricing)}%`
    : introductoryOffer && 'Oferta de lançamento'

  return (
    <article className={classNames(styles.card, styles.featured)}>
      <header className={styles.header}>
        <h3 className={styles.name}>{plan.name}</h3>
        {badgeLabel && <Badge>{badgeLabel}</Badge>}
      </header>

      {/* Keyed by cycle so the entrance animation replays when the billing cycle changes. */}
      <div key={billingCycle} className={styles.pricing}>
        <div className={styles.price}>
          <span className={styles.currency}>R$</span>
          <span className={styles.priceValue}>{integer}</span>
          <span className={styles.cents}>,{cents}</span>
          <span className={styles.period}>
            /mês
            {introductoryOffer && (
              <span className={styles.periodNote}>
                nos {introductoryOffer.durationInMonths} primeiros meses
              </span>
            )}
          </span>
        </div>

        <p className={styles.priceDetail}>
          {isYearly
            ? `${formatPriceInCents(pricing.yearlyPriceInCents)} cobrados uma vez por ano.`
            : introductoryOffer &&
              `Depois, ${formatPriceInCents(pricing.monthlyPriceInCents)}/mês a partir do ${introductoryOffer.durationInMonths + 1}º mês.`}
        </p>
      </div>

      <Text size="sm">{plan.description}</Text>

      <ul className={styles.features}>
        {plan.features.map((feature) => (
          <li key={feature} className={styles.feature}>
            <Check size={16} className={styles.featureIcon} aria-hidden="true" />
            {feature}
          </li>
        ))}
      </ul>

      <Button href={SIGN_UP_HREF} isFullWidth hasArrow className={styles.action}>
        {plan.ctaLabel}
      </Button>
    </article>
  )
}

type ComingSoonCardProps = {
  plan: PricingPlan
}

function ComingSoonCard({ plan }: ComingSoonCardProps) {
  return (
    <article className={classNames(styles.card, styles.comingSoon)}>
      <header className={styles.header}>
        <h3 className={styles.name}>{plan.name}</h3>
        <Badge>
          <Clock size={14} aria-hidden="true" />
          Em breve
        </Badge>
      </header>

      <div className={styles.pricing} aria-hidden="true">
        <span className={styles.skeletonPrice} />
        <span className={styles.skeletonDetail} />
      </div>

      <Text size="sm">{plan.description}</Text>

      <div className={styles.skeletonFeatures} aria-hidden="true" />

      <Button variant="outline" isFullWidth disabled className={styles.action}>
        {plan.ctaLabel}
      </Button>
    </article>
  )
}
