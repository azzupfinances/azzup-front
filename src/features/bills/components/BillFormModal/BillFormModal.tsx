'use client'

import { Trash2 } from 'lucide-react'
import { useId } from 'react'

import { BillForm } from '@/features/bills/components/BillForm/BillForm'
import type { BillFormValues } from '@/features/bills/schemas/bill-form.schema'
import type { Bill } from '@/features/bills/types/bill.types'
import { Button } from '@/shared/components/Button/Button'
import { Modal } from '@/shared/components/Modal/Modal'

import styles from './BillFormModal.module.scss'

const NEW_BILL_VALUES: BillFormValues = {
  name: '',
  amountInCents: 0,
  categoryId: 'housing',
  dueDay: 10,
}

type BillFormModalProps = {
  isOpen: boolean
  // Edits this bill when set; creates a new one otherwise.
  bill: Bill | null
  onClose: () => void
  onSubmit: (values: BillFormValues) => void
  onDelete: (bill: Bill) => void
}

export function BillFormModal({ isOpen, bill, onClose, onSubmit, onDelete }: BillFormModalProps) {
  const formId = useId()

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={bill ? 'Editar conta fixa' : 'Nova conta fixa'}
      description={bill ? undefined : 'Uma despesa que se repete todo mês, como aluguel ou internet.'}
      footer={
        <>
          {bill && (
            <Button variant="ghost" className={styles.deleteButton} onClick={() => onDelete(bill)}>
              <Trash2 size={18} aria-hidden="true" />
              Remover
            </Button>
          )}
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit" form={formId}>
            Salvar
          </Button>
        </>
      }
    >
      {/* Mounted only while open and keyed by bill, so every opening starts clean. */}
      {isOpen && (
        <BillForm
          key={bill?.id ?? 'new'}
          formId={formId}
          defaultValues={bill ?? NEW_BILL_VALUES}
          onSubmit={onSubmit}
        />
      )}
    </Modal>
  )
}
