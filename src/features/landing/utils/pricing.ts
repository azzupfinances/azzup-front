import type { PlanPricing } from '@/features/landing/types/landing.types'

const MONTHS_PER_YEAR = 12

export function getYearlyMonthlyEquivalentInCents(pricing: PlanPricing) {
  return Math.round(pricing.yearlyPriceInCents / MONTHS_PER_YEAR)
}

// Discount of the yearly plan compared with twelve months at the regular monthly price.
export function getYearlyDiscountPercentage(pricing: PlanPricing) {
  const fullYearInCents = pricing.monthlyPriceInCents * MONTHS_PER_YEAR

  return Math.round((1 - pricing.yearlyPriceInCents / fullYearInCents) * 100)
}
