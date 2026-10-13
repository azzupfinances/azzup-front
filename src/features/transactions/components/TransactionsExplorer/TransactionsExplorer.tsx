'use client'

import { SearchX } from 'lucide-react'
import { useState } from 'react'

import { TransactionDayGroup } from '@/features/transactions/components/TransactionDayGroup/TransactionDayGroup'
import { TransactionEditModal } from '@/features/transactions/components/TransactionEditModal/TransactionEditModal'
import { TransactionFilters } from '@/features/transactions/components/TransactionFilters/TransactionFilters'
import { TransactionsSummary } from '@/features/transactions/components/TransactionsSummary/TransactionsSummary'
import {
  DEFAULT_TRANSACTIONS_FILTERS,
  SAMPLE_TRANSACTIONS,
} from '@/features/transactions/constants/transactions-sample'
import type { Transaction } from '@/features/transactions/types/transaction.types'
import { getMonthCardInstallments } from '@/features/transactions/utils/card-installments'
import {
  filterTransactions,
  groupTransactionsByDay,
  summarizeTransactions,
} from '@/features/transactions/utils/transaction-list'
import { Button } from '@/shared/components/Button/Button'
import { EmptyState } from '@/shared/components/EmptyState/EmptyState'
import { useCreditCards } from '@/shared/hooks/useCreditCards'
import { useTodayIsoDate } from '@/shared/hooks/useTodayIsoDate'
import { useToast } from '@/shared/hooks/useToast'

import styles from './TransactionsExplorer.module.scss'

// Visual phase: edits and deletions only change this local list (simulated), and the
// month switcher does not reload it yet.
export function TransactionsExplorer() {
  const [transactions, setTransactions] = useState(SAMPLE_TRANSACTIONS)
  const [filters, setFilters] = useState(DEFAULT_TRANSACTIONS_FILTERS)
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null)
  const todayIsoDate = useTodayIsoDate()
  const { showToast } = useToast()
  const { creditCards, purchases } = useCreditCards()

  // Card installments of the month join the list; they need "today", known only in the browser.
  const monthTransactions = todayIsoDate
    ? [...transactions, ...getMonthCardInstallments(purchases, todayIsoDate)]
    : transactions
  const summary = summarizeTransactions(monthTransactions)
  const dayGroups = groupTransactionsByDay(filterTransactions(monthTransactions, filters))

  // Pending backend integration: update through the transactions service.
  function handleSave(updatedTransaction: Transaction) {
    setTransactions((current) =>
      current.map((transaction) => (transaction.id === updatedTransaction.id ? updatedTransaction : transaction)),
    )
    setSelectedTransaction(null)
    showToast({ tone: 'success', title: 'Transação atualizada', description: updatedTransaction.description })
  }

  // Pending backend integration: delete through the transactions service.
  function handleDelete(deletedTransaction: Transaction) {
    setTransactions((current) => current.filter((transaction) => transaction.id !== deletedTransaction.id))
    setSelectedTransaction(null)
    showToast({ tone: 'success', title: 'Transação excluída', description: deletedTransaction.description })
  }

  return (
    <div className={styles.explorer}>
      <TransactionsSummary {...summary} />

      <TransactionFilters filters={filters} creditCards={creditCards} onFiltersChange={setFilters} />

      {dayGroups.length > 0 ? (
        <div className={styles.groups}>
          {dayGroups.map((group) => (
            <TransactionDayGroup
              key={group.date}
              group={group}
              todayIsoDate={todayIsoDate}
              creditCards={creditCards}
              onTransactionClick={setSelectedTransaction}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={SearchX}
          title="Nenhuma transação encontrada"
          description="Tente buscar outro termo ou mudar os filtros."
          action={
            <Button variant="outline" onClick={() => setFilters(DEFAULT_TRANSACTIONS_FILTERS)}>
              Limpar filtros
            </Button>
          }
        />
      )}

      <TransactionEditModal
        transaction={selectedTransaction}
        onClose={() => setSelectedTransaction(null)}
        onSave={handleSave}
        onDelete={handleDelete}
      />
    </div>
  )
}
