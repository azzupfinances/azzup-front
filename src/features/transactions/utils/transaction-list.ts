import type {
  Transaction,
  TransactionDayGroup,
  TransactionsFilters,
} from '@/features/transactions/types/transaction.types'

// Accent-insensitive, so "farmacia" finds "Farmácia".
function normalizeText(text: string) {
  return text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .trim()
}

export function filterTransactions(transactions: Transaction[], filters: TransactionsFilters) {
  const search = normalizeText(filters.search)

  return transactions.filter((transaction) => {
    if (filters.type === 'income' && transaction.amountInCents <= 0) {
      return false
    }

    if (filters.type === 'expense' && transaction.amountInCents >= 0) {
      return false
    }

    if (filters.categoryId !== 'all' && transaction.categoryId !== filters.categoryId) {
      return false
    }

    return !search || normalizeText(transaction.description).includes(search)
  })
}

// Newest day first; each day keeps its own net total.
export function groupTransactionsByDay(transactions: Transaction[]): TransactionDayGroup[] {
  const groups = new Map<string, TransactionDayGroup>()
  const sortedTransactions = [...transactions].sort((first, second) => second.date.localeCompare(first.date))

  for (const transaction of sortedTransactions) {
    const group = groups.get(transaction.date) ?? { date: transaction.date, totalInCents: 0, transactions: [] }

    group.totalInCents += transaction.amountInCents
    group.transactions.push(transaction)
    groups.set(transaction.date, group)
  }

  return [...groups.values()]
}

export function summarizeTransactions(transactions: Transaction[]) {
  let incomeInCents = 0
  let expensesInCents = 0

  for (const transaction of transactions) {
    if (transaction.amountInCents > 0) {
      incomeInCents += transaction.amountInCents
    } else {
      expensesInCents += Math.abs(transaction.amountInCents)
    }
  }

  return { incomeInCents, expensesInCents, balanceInCents: incomeInCents - expensesInCents }
}
