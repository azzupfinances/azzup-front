'use client'

import { useState } from 'react'

import { PricingCard } from '@/features/landing/components/PricingCard/PricingCard'
import { PRICING_PLANS } from '@/features/landing/constants/landing-content'
import type { BillingCycle } from '@/features/landing/types/landing.types'
import { getYearlyDiscountPercentage } from '@/features/landing/utils/pricing'
import { Switch } from '@/shared/components/Switch/Switch'
import { classNames } from '@/shared/utils/class-names'

import styles from './PricingPlans.module.scss'

const availablePlanPricing = PRICING_PLANS.find((plan) => plan.status === 'available')?.pricing

export function PricingPlans() {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('monthly')
  const isYearly = billingCycle === 'yearly'

  function handleBillingCycleChange(isYearlySelected: boolean) {
    setBillingCycle(isYearlySelected ? 'yearly' : 'monthly')
  }

  return (
    <div className={styles.pricingPlans}>
      <div className={styles.billingToggle}>
        <span className={classNames(styles.billingLabel, !isYearly && styles.activeLabel)}>
          Mensal
        </span>
        <Switch
          isChecked={isYearly}
          label="Cobrança anual"
          onCheckedChange={handleBillingCycleChange}
        />
        <span className={classNames(styles.billingLabel, isYearly && styles.activeLabel)}>
          Anual
        </span>
        {availablePlanPricing && (
          <span className={styles.discount}>
            Economize {getYearlyDiscountPercentage(availablePlanPricing)}%
          </span>
        )}
      </div>

      <ul className={styles.grid}>
        {PRICING_PLANS.map((plan) => (
          <li
            key={plan.id}
            className={classNames(plan.status === 'available' && styles.availableItem)}
          >
            <PricingCard plan={plan} billingCycle={billingCycle} />
          </li>
        ))}
      </ul>
    </div>
  )
}
