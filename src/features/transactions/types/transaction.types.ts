import type { PaymentMethodId } from '@/shared/constants/payment-methods'
import type { CategoryId } from '@/shared/constants/transaction-categories'

export type Transaction = {
  id: string
  description: string
  // Negative = expense, positive = income.
  amountInCents: number
  // ISO date (YYYY-MM-DD).
  date: string
  categoryId: CategoryId
  source: 'manual' | 'import'
  // Expenses only; income has no payment method.
  paymentMethodId?: PaymentMethodId
  // Set on card installments, which are derived from card purchases instead of stored.
  cardInstallment?: CardInstallmentInfo
}

export type CardInstallmentInfo = {
  creditCardId: string
  number: number
  count: number
}

export type TransactionTypeFilter = 'all' | 'income' | 'expense'

// `all`, one payment method, or one specific credit card.
export type PaymentFilter =
  | { kind: 'all' }
  | { kind: 'method'; paymentMethodId: PaymentMethodId }
  | { kind: 'card'; creditCardId: string }

export type TransactionsFilters = {
  search: string
  type: TransactionTypeFilter
  categoryId: CategoryId | 'all'
  payment: PaymentFilter
}

export type TransactionDayGroup = {
  date: string
  transactions: Transaction[]
}
