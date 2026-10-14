import type { Bill } from '@/features/bills/types/bill.types'

// Static example content for the visual phase, matching the dashboard sample month
// (October 2026). Replaced by the bills service once the backend exists.
const SAMPLE_PAID_MONTH = '2026-10'

export const SAMPLE_BILLS: Bill[] = [
  {
    id: 'rent',
    name: 'Aluguel',
    categoryId: 'housing',
    amountInCents: 120_000,
    dueDay: 10,
    paidMonths: [],
  },
  {
    id: 'electricity',
    name: 'Conta de luz',
    categoryId: 'housing',
    amountInCents: 18_742,
    dueDay: 3,
    paidMonths: [],
  },
  {
    id: 'internet',
    name: 'Internet',
    categoryId: 'housing',
    amountInCents: 9_990,
    dueDay: 8,
    paidMonths: [SAMPLE_PAID_MONTH],
  },
  {
    id: 'phone',
    name: 'Plano de celular',
    categoryId: 'other',
    amountInCents: 4_990,
    dueDay: 12,
    paidMonths: [SAMPLE_PAID_MONTH],
  },
  {
    id: 'gym',
    name: 'Academia',
    categoryId: 'health',
    amountInCents: 8_990,
    dueDay: 15,
    paidMonths: [],
  },
  {
    id: 'course',
    name: 'Curso de inglês',
    categoryId: 'education',
    amountInCents: 29_900,
    dueDay: 20,
    paidMonths: [],
  },
  {
    id: 'netflix',
    name: 'Netflix',
    categoryId: 'subscriptions',
    amountInCents: 5_590,
    dueDay: 4,
    paidMonths: [SAMPLE_PAID_MONTH],
  },
  {
    id: 'spotify',
    name: 'Spotify',
    categoryId: 'subscriptions',
    amountInCents: 2_190,
    dueDay: 25,
    paidMonths: [],
  },
]
