import type { BankId } from '@/shared/constants/banks'
import type { CategoryId } from '@/shared/constants/transaction-categories'

export type CreditCard = {
  id: string
  name: string
  // Gives the card its logo and brand color.
  bankId: BankId
  limitInCents: number
  // Day of the month the bill is due (1–31).
  dueDay: number
  // Months ("YYYY-MM") whose invoice was marked as paid.
  paidInvoiceMonths: string[]
}

// One card purchase, paid in full (1 installment) or in N installments.
export type CardPurchase = {
  id: string
  creditCardId: string
  description: string
  categoryId: CategoryId
  totalInCents: number
  installmentsCount: number
  // ISO date of the purchase; the first installment falls on this date.
  purchaseDate: string
}

export type Installment = {
  purchaseId: string
  // 1-based position in the series.
  number: number
  amountInCents: number
  // ISO date (YYYY-MM-DD).
  dueDate: string
}

export type CreditCardSummary = {
  limitInCents: number
  // Sum of every installment not paid yet, including the current month.
  committedInCents: number
  // Negative when the card is over its limit.
  availableInCents: number
  currentMonthInCents: number
  // ISO date of the furthest pending installment; `null` when nothing is pending.
  lastInstallmentDate: string | null
}
