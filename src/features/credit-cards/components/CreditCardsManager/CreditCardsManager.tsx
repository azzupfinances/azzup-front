'use client'

import { CreditCard as CreditCardIcon, Plus } from 'lucide-react'
import { useState } from 'react'

import { CreditCardDetails } from '@/features/credit-cards/components/CreditCardDetails/CreditCardDetails'
import { CreditCardFormModal } from '@/features/credit-cards/components/CreditCardFormModal/CreditCardFormModal'
import type { CreditCardFormValues } from '@/features/credit-cards/schemas/credit-card-form.schema'
import { Button } from '@/shared/components/Button/Button'
import { EmptyState } from '@/shared/components/EmptyState/EmptyState'
import { Modal } from '@/shared/components/Modal/Modal'
import { PageHeader } from '@/shared/components/PageHeader/PageHeader'
import { Reveal } from '@/shared/components/Reveal/Reveal'
import { Skeleton } from '@/shared/components/Skeleton/Skeleton'
import { useCreditCards } from '@/shared/hooks/useCreditCards'
import { useTodayIsoDate } from '@/shared/hooks/useTodayIsoDate'
import { useToast } from '@/shared/hooks/useToast'
import type { CreditCard } from '@/shared/types/credit-card.types'

import styles from './CreditCardsManager.module.scss'

// Visual phase: changes only update the in-memory cards (simulated).
export function CreditCardsManager() {
  const { creditCards, purchases, createCreditCard, updateCreditCard, deleteCreditCard } = useCreditCards()
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingCreditCard, setEditingCreditCard] = useState<CreditCard | null>(null)
  const [creditCardToDelete, setCreditCardToDelete] = useState<CreditCard | null>(null)
  const todayIsoDate = useTodayIsoDate()
  const { showToast } = useToast()

  function handleOpenCreate() {
    setEditingCreditCard(null)
    setIsFormOpen(true)
  }

  function handleOpenEdit(creditCard: CreditCard) {
    setEditingCreditCard(creditCard)
    setIsFormOpen(true)
  }

  // Pending backend integration: create/update through the credit cards service.
  function handleSubmit(values: CreditCardFormValues) {
    if (editingCreditCard) {
      updateCreditCard({ ...editingCreditCard, ...values })
      showToast({ tone: 'success', title: 'Cartão atualizado', description: values.name })
    } else {
      createCreditCard(values)
      showToast({ tone: 'success', title: 'Cartão cadastrado', description: values.name })
    }

    setIsFormOpen(false)
  }

  function handleRequestDelete(creditCard: CreditCard) {
    setIsFormOpen(false)
    setCreditCardToDelete(creditCard)
  }

  // Pending backend integration: delete through the credit cards service.
  function handleConfirmDelete() {
    if (!creditCardToDelete) {
      return
    }

    deleteCreditCard(creditCardToDelete.id)
    showToast({ tone: 'success', title: 'Cartão removido', description: creditCardToDelete.name })
    setCreditCardToDelete(null)
  }

  return (
    <div className={styles.manager}>
      <Reveal>
        <PageHeader
          title="Cartões"
          description="Limite, parcelas e quanto cada cartão pesa no mês."
          actions={
            <Button onClick={handleOpenCreate}>
              <Plus size={18} aria-hidden="true" />
              Novo cartão
            </Button>
          }
        />
      </Reveal>

      <Reveal delay={100}>
        {creditCards.length === 0 ? (
          <EmptyState
            icon={CreditCardIcon}
            title="Nenhum cartão cadastrado"
            description="Cadastre um cartão para lançar compras parceladas e acompanhar o limite."
            action={
              <Button variant="outline" onClick={handleOpenCreate}>
                Cadastrar cartão
              </Button>
            }
          />
        ) : (
          <div className={styles.grid} aria-busy={todayIsoDate === null || undefined}>
            {creditCards.map((creditCard) =>
              // Totals depend on the current month, known only in the browser.
              todayIsoDate ? (
                <CreditCardDetails
                  key={creditCard.id}
                  creditCard={creditCard}
                  purchases={purchases}
                  todayIsoDate={todayIsoDate}
                  onEdit={handleOpenEdit}
                />
              ) : (
                <Skeleton key={creditCard.id} shape="block" height="420px" />
              ),
            )}
          </div>
        )}
      </Reveal>

      <CreditCardFormModal
        isOpen={isFormOpen}
        creditCard={editingCreditCard}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleSubmit}
        onDelete={handleRequestDelete}
      />

      <Modal
        isOpen={creditCardToDelete !== null}
        onClose={() => setCreditCardToDelete(null)}
        title={`Remover ${creditCardToDelete?.name ?? 'cartão'}?`}
        description="As compras lançadas neste cartão também serão removidas."
        footer={
          <>
            <Button variant="outline" onClick={() => setCreditCardToDelete(null)}>
              Cancelar
            </Button>
            <Button variant="danger" onClick={handleConfirmDelete}>
              Remover cartão
            </Button>
          </>
        }
      />
    </div>
  )
}
