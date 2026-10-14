import type { CategoryId } from '@/shared/constants/transaction-categories'
import type { CreditCard } from '@/shared/types/credit-card.types'

// A fixed expense repeated every month (rent, internet, gym).
export type Bill = {
  id: string
  name: string
  categoryId: CategoryId
  amountInCents: number
  // Day of the month it is due; months without that day use their last day.
  dueDay: number
  // Months ("YYYY-MM") already paid.
  paidMonths: string[]
}

export type BillStatus = 'overdue' | 'pending' | 'paid'

// Everything to pay this month: fixed bills plus the current credit card invoices.
export type PaymentSource = { kind: 'bill'; bill: Bill } | { kind: 'creditCardInvoice'; creditCard: CreditCard }

export type PaymentOfMonth = {
  id: string
  name: string
  amountInCents: number
  dueDay: number
  source: PaymentSource
  status: BillStatus
  dueDate: string
  // Negative once the due date has passed.
  daysUntilDue: number
}

export type PaymentsMonthSummary = {
  totalInCents: number
  paidInCents: number
  remainingInCents: number
  overdueCount: number
}
