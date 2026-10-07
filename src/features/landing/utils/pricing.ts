import type { PlanPricing } from '@/features/landing/types/landing.types'

const MONTHS_PER_YEAR = 12

const currencyFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
})

const amountFormatter = new Intl.NumberFormat('pt-BR', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

export function formatPriceInCents(priceInCents: number) {
  return currencyFormatter.format(priceInCents / 100)
}

// Splits a price into integer and cents so they can be styled separately (e.g. "22" and "49").
export function splitPriceInCents(priceInCents: number) {
  const [integer, cents] = amountFormatter.format(priceInCents / 100).split(',')

  return { integer, cents }
}

export function getYearlyMonthlyEquivalentInCents(pricing: PlanPricing) {
  return Math.round(pricing.yearlyPriceInCents / MONTHS_PER_YEAR)
}

// Discount of the yearly plan compared with twelve months at the regular monthly price.
export function getYearlyDiscountPercentage(pricing: PlanPricing) {
  const fullYearInCents = pricing.monthlyPriceInCents * MONTHS_PER_YEAR

  return Math.round((1 - pricing.yearlyPriceInCents / fullYearInCents) * 100)
}
