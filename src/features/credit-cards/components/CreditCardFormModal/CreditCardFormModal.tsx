'use client'

import { Trash2 } from 'lucide-react'
import { useId } from 'react'

import { CreditCardForm } from '@/features/credit-cards/components/CreditCardForm/CreditCardForm'
import type { CreditCardFormValues } from '@/features/credit-cards/schemas/credit-card-form.schema'
import { Button } from '@/shared/components/Button/Button'
import { Modal } from '@/shared/components/Modal/Modal'
import type { CreditCard } from '@/shared/types/credit-card.types'

import styles from './CreditCardFormModal.module.scss'

const NEW_CREDIT_CARD_VALUES: CreditCardFormValues = {
  bankId: 'other',
  name: '',
  limitInCents: 0,
  dueDay: 10,
}

type CreditCardFormModalProps = {
  isOpen: boolean
  // Edits this card when set; creates a new one otherwise.
  creditCard: CreditCard | null
  onClose: () => void
  onSubmit: (values: CreditCardFormValues) => void
  onDelete: (creditCard: CreditCard) => void
}

export function CreditCardFormModal({ isOpen, creditCard, onClose, onSubmit, onDelete }: CreditCardFormModalProps) {
  const formId = useId()

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={creditCard ? 'Editar cartão' : 'Novo cartão'}
      description={creditCard ? undefined : 'Informe o limite e o dia em que a fatura vence.'}
      footer={
        <>
          {creditCard && (
            <Button variant="ghost" className={styles.deleteButton} onClick={() => onDelete(creditCard)}>
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
      {/* Mounted only while open and keyed by card, so every opening starts clean. */}
      {isOpen && (
        <CreditCardForm
          key={creditCard?.id ?? 'new'}
          formId={formId}
          defaultValues={creditCard ?? NEW_CREDIT_CARD_VALUES}
          onSubmit={onSubmit}
        />
      )}
    </Modal>
  )
}
