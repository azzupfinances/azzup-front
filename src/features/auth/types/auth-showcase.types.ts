import type { LucideIcon } from 'lucide-react'

export type ShowcaseSlideId = 'dashboard' | 'bills'

export type ShowcaseSlide = {
  id: ShowcaseSlideId
  highlightedTitle: string
  title: string
  description: string
}

// `tone` is separate from `direction` because spending going down is good news.
export type Trend = {
  value: string
  direction: 'up' | 'down'
  tone: 'positive' | 'negative'
}

export type DashboardMetric = {
  icon: LucideIcon
  label: string
  value: string
  trend?: Trend
}

export type ChartPoint = {
  x: number
  y: number
}

export type TransactionItem = {
  icon: LucideIcon
  title: string
  description: string
  status: string
}

export type BudgetCategory = {
  label: string
  percentage: number
}
