import type { LucideIcon } from 'lucide-react'

export type NavigationLink = {
  label: string
  href: string
}

export type FeatureItem = {
  icon: LucideIcon
  title: string
  description: string
}

export type StepItem = {
  icon: LucideIcon
  title: string
  description: string
}

export type FaqItem = {
  id: string
  question: string
  answer: string
}

export type FooterLinkGroup = {
  title: string
  links: NavigationLink[]
}

export type BillingCycle = 'monthly' | 'yearly'

export type PlanStatus = 'available' | 'coming-soon'

export type IntroductoryOffer = {
  priceInCents: number
  durationInMonths: number
}

export type PlanPricing = {
  monthlyPriceInCents: number
  // Applies to monthly billing only; the yearly plan has its own fixed price.
  introductoryOffer?: IntroductoryOffer
  yearlyPriceInCents: number
}

export type PricingPlan = {
  id: string
  name: string
  description: string
  status: PlanStatus
  pricing?: PlanPricing
  features: string[]
  ctaLabel: string
}

export type PressMention = {
  id: string
  source: string
  quote: string
  href: string
}
