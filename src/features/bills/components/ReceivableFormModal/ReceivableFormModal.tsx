'use client'

import { Trash2 } from 'lucide-react'
import { useId } from 'react'

import { ReceivableForm } from '@/features/bills/components/ReceivableForm/ReceivableForm'
import type { ReceivableFormValues } from '@/features/bills/schemas/receivable-form.schema'
import type { Receivable } from '@/features/bills/types/receivable.types'
import { Button } from '@/shared/components/Button/Button'
import { Modal } from '@/shared/components/Modal/Modal'

import styles from './ReceivableFormModal.module.scss'

type ReceivableFormModalProps = {
  isOpen: boolean
  // Edits this receivable when set; creates a new one otherwise.
  receivable: Receivable | null
  // Default first installment date for a new receivable.
  todayIsoDate: string | null
  onClose: () => void
  onSubmit: (values: ReceivableFormValues) => void
  onDelete: (receivable: Receivable) => void
}

export function ReceivableFormModal({
  isOpen,
  receivable,
  todayIsoDate,
  onClose,
  onSubmit,
  onDelete,
}: ReceivableFormModalProps) {
  const formId = useId()
  const newReceivableValues: ReceivableFormValues = {
    description: '',
    payerName: '',
    totalInCents: 0,
    installmentsCount: 1,
    firstDueDate: todayIsoDate ?? '',
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={receivable ? 'Editar valor a receber' : 'Novo valor a receber'}
      description={receivable ? undefined : 'Dinheiro que alguém vai te devolver, de uma vez ou parcelado.'}
      footer={
        <>
          {receivable && (
            <Button variant="ghost" className={styles.deleteButton} onClick={() => onDelete(receivable)}>
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
      {/* Mounted only while open and keyed by receivable, so every opening starts clean. */}
      {isOpen && (
        <ReceivableForm
          key={receivable?.id ?? 'new'}
          formId={formId}
          defaultValues={receivable ?? newReceivableValues}
          onSubmit={onSubmit}
        />
      )}
    </Modal>
  )
}
