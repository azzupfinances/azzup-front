'use client'

import { Plus } from 'lucide-react'
import { useId, useState } from 'react'

import { Button } from '@/shared/components/Button/Button'
import { Modal } from '@/shared/components/Modal/Modal'
import { TransactionForm } from '@/shared/components/TransactionForm/TransactionForm'
import { useToast } from '@/shared/hooks/useToast'
import type { TransactionFormValues } from '@/shared/schemas/transaction-form.schema'
import { formatCurrency } from '@/shared/utils/format-currency'
import { getTodayIsoDate } from '@/shared/utils/iso-date'

import styles from './NewTransactionButton.module.scss'

type NewTransactionButtonProps = {
  // `sidebar` is the full-width desktop button; `fab` is the raised center tab on phones.
  variant: 'sidebar' | 'fab'
}

export function NewTransactionButton({ variant }: NewTransactionButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [defaultValues, setDefaultValues] = useState<TransactionFormValues | null>(null)
  const formId = useId()
  const { showToast } = useToast()

  function handleOpen() {
    setDefaultValues({
      type: 'expense',
      amountInCents: 0,
      description: '',
      categoryId: 'food',
      date: getTodayIsoDate(),
    })
    setIsOpen(true)
  }

  // Pending backend integration: create the transaction through the transactions service.
  function handleSubmit(values: TransactionFormValues) {
    setIsOpen(false)
    showToast({
      tone: 'success',
      title: values.type === 'expense' ? 'Despesa adicionada' : 'Receita adicionada',
      description: `${values.description} · ${formatCurrency(values.amountInCents)}`,
    })
  }

  return (
    <>
      {variant === 'sidebar' ? (
        <Button isFullWidth onClick={handleOpen}>
          <Plus size={18} aria-hidden="true" />
          Nova transação
        </Button>
      ) : (
        <button type="button" className={styles.fab} aria-label="Nova transação" onClick={handleOpen}>
          <Plus size={24} aria-hidden="true" />
        </button>
      )}

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Nova transação"
        description="Registre um gasto ou uma entrada de dinheiro."
        footer={
          <>
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit" form={formId}>
              Salvar
            </Button>
          </>
        }
      >
        {/* Mounted only while open, so every opening starts with a clean form. */}
        {isOpen && defaultValues && (
          <TransactionForm formId={formId} defaultValues={defaultValues} onSubmit={handleSubmit} />
        )}
      </Modal>
    </>
  )
}
