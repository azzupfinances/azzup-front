import type { CategoryId } from '@/shared/constants/transaction-categories'

// Static example content for the visual phase. Replaced by the dashboard service once the
// backend exists; amounts are integer cents.

export const SAMPLE_USER_FIRST_NAME = 'Marina'

export const SAMPLE_MONTH_SUMMARY = {
  incomeInCents: 485_000,
  expensesInCents: 312_740,
  balanceTrendPercentage: 8,
}

export const SAMPLE_PAYDAY = {
  daysUntilPayday: 12,
  paydayLabel: 'dia 5',
  // Share of the pay cycle already elapsed, 0–100.
  cycleProgressPercentage: 60,
}

export type SampleCategorySpending = {
  categoryId: CategoryId
  amountInCents: number
}

export const SAMPLE_CATEGORY_SPENDING: SampleCategorySpending[] = [
  { categoryId: 'housing', amountInCents: 145_000 },
  { categoryId: 'food', amountInCents: 78_230 },
  { categoryId: 'transport', amountInCents: 32_010 },
  { categoryId: 'leisure', amountInCents: 24_500 },
  { categoryId: 'health', amountInCents: 20_000 },
  { categoryId: 'subscriptions', amountInCents: 13_000 },
]

export type SampleBill = {
  id: string
  name: string
  categoryId: CategoryId
  amountInCents: number
  dueDateLabel: string
  status: 'pending' | 'overdue'
}

export const SAMPLE_UPCOMING_BILLS: SampleBill[] = [
  {
    id: 'electricity',
    name: 'Conta de luz',
    categoryId: 'housing',
    amountInCents: 18_742,
    dueDateLabel: 'Venceu 03/10',
    status: 'overdue',
  },
  {
    id: 'internet',
    name: 'Internet',
    categoryId: 'housing',
    amountInCents: 9_990,
    dueDateLabel: 'Vence 08/10',
    status: 'pending',
  },
  {
    id: 'rent',
    name: 'Aluguel',
    categoryId: 'housing',
    amountInCents: 120_000,
    dueDateLabel: 'Vence 10/10',
    status: 'pending',
  },
  {
    id: 'gym',
    name: 'Academia',
    categoryId: 'health',
    amountInCents: 8_990,
    dueDateLabel: 'Vence 15/10',
    status: 'pending',
  },
]

export type SampleTransaction = {
  id: string
  description: string
  categoryId: CategoryId
  amountInCents: number
  dateLabel: string
}

export const SAMPLE_RECENT_TRANSACTIONS: SampleTransaction[] = [
  {
    id: 'market',
    description: 'Mercado Extra',
    categoryId: 'food',
    amountInCents: -18_432,
    dateLabel: 'Hoje',
  },
  { id: 'uber', description: 'Uber', categoryId: 'transport', amountInCents: -2_390, dateLabel: 'Ontem' },
  { id: 'ifood', description: 'iFood', categoryId: 'food', amountInCents: -6_750, dateLabel: 'Ontem' },
  {
    id: 'pharmacy',
    description: 'Farmácia São João',
    categoryId: 'health',
    amountInCents: -4_780,
    dateLabel: '06/10',
  },
  {
    id: 'salary',
    description: 'Salário',
    categoryId: 'other',
    amountInCents: 485_000,
    dateLabel: '05/10',
  },
  {
    id: 'netflix',
    description: 'Netflix',
    categoryId: 'subscriptions',
    amountInCents: -5_590,
    dateLabel: '04/10',
  },
]

export const SAMPLE_YEAR = 2026

export type SampleMonthResult = {
  // 0 = January.
  monthIndex: number
  incomeInCents: number
  expensesInCents: number
}

// Months already started this year; the last one is still in progress.
export const SAMPLE_YEAR_MONTHS: SampleMonthResult[] = [
  { monthIndex: 0, incomeInCents: 485_000, expensesInCents: 443_800 },
  { monthIndex: 1, incomeInCents: 485_000, expensesInCents: 456_300 },
  // March includes the yearly profit-sharing payment (PLR).
  { monthIndex: 2, incomeInCents: 685_000, expensesInCents: 438_700 },
  { monthIndex: 3, incomeInCents: 485_000, expensesInCents: 429_900 },
  { monthIndex: 4, incomeInCents: 485_000, expensesInCents: 446_100 },
  { monthIndex: 5, incomeInCents: 485_000, expensesInCents: 413_600 },
  { monthIndex: 6, incomeInCents: 485_000, expensesInCents: 440_800 },
  { monthIndex: 7, incomeInCents: 485_000, expensesInCents: 421_200 },
  { monthIndex: 8, incomeInCents: 500_000, expensesInCents: 417_900 },
  { monthIndex: 9, incomeInCents: 485_000, expensesInCents: 312_740 },
]

// Adds up to the year's expenses above.
export const SAMPLE_YEAR_CATEGORY_SPENDING: SampleCategorySpending[] = [
  { categoryId: 'housing', amountInCents: 1_740_000 },
  { categoryId: 'food', amountInCents: 980_000 },
  { categoryId: 'transport', amountInCents: 420_000 },
  { categoryId: 'leisure', amountInCents: 310_000 },
  { categoryId: 'health', amountInCents: 260_000 },
  { categoryId: 'education', amountInCents: 189_000 },
  { categoryId: 'subscriptions', amountInCents: 186_000 },
  { categoryId: 'other', amountInCents: 136_040 },
]
