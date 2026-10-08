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
}

export type TransactionTypeFilter = 'all' | 'income' | 'expense'

export type TransactionsFilters = {
  search: string
  type: TransactionTypeFilter
  categoryId: CategoryId | 'all'
}

export type TransactionDayGroup = {
  date: string
  totalInCents: number
  transactions: Transaction[]
}
