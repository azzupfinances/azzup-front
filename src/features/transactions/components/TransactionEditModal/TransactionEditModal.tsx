'use client'

import { Trash2 } from 'lucide-react'
import { useId } from 'react'

import type { Transaction } from '@/features/transactions/types/transaction.types'
import { Button } from '@/shared/components/Button/Button'
import { Modal } from '@/shared/components/Modal/Modal'
import { TransactionForm } from '@/shared/components/TransactionForm/TransactionForm'
import type { TransactionFormValues } from '@/shared/schemas/transaction-form.schema'

import styles from './TransactionEditModal.module.scss'

type TransactionEditModalProps = {
  // The modal is open while a transaction is selected.
  transaction: Transaction | null
  onClose: () => void
  onSave: (transaction: Transaction) => void
  onDelete: (transaction: Transaction) => void
}

function toFormValues(transaction: Transaction): TransactionFormValues {
  return {
    type: transaction.amountInCents > 0 ? 'income' : 'expense',
    amountInCents: Math.abs(transaction.amountInCents),
    description: transaction.description,
    categoryId: transaction.categoryId,
    date: transaction.date,
  }
}

export function TransactionEditModal({ transaction, onClose, onSave, onDelete }: TransactionEditModalProps) {
  const formId = useId()

  function handleSubmit(values: TransactionFormValues) {
    if (!transaction) {
      return
    }

    onSave({
      ...transaction,
      description: values.description,
      amountInCents: values.type === 'expense' ? -values.amountInCents : values.amountInCents,
      categoryId: values.categoryId,
      date: values.date,
    })
  }

  return (
    <Modal
      isOpen={transaction !== null}
      onClose={onClose}
      title="Editar transação"
      footer={
        <>
          <Button
            variant="ghost"
            className={styles.deleteButton}
            onClick={() => transaction && onDelete(transaction)}
          >
            <Trash2 size={18} aria-hidden="true" />
            Excluir
          </Button>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit" form={formId}>
            Salvar
          </Button>
        </>
      }
    >
      {/* Keyed by id so switching transactions resets the form. */}
      {transaction && (
        <TransactionForm
          key={transaction.id}
          formId={formId}
          defaultValues={toFormValues(transaction)}
          onSubmit={handleSubmit}
        />
      )}
    </Modal>
  )
}
