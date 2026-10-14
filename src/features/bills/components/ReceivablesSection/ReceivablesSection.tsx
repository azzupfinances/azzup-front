'use client'

import { HandCoins, Plus } from 'lucide-react'
import { useId, useState } from 'react'

import { MonthEntryRow } from '@/features/bills/components/MonthEntryRow/MonthEntryRow'
import { ReceivableFormModal } from '@/features/bills/components/ReceivableFormModal/ReceivableFormModal'
import { useRowHighlight } from '@/features/bills/hooks/useRowHighlight'
import { SAMPLE_RECEIVABLES } from '@/features/bills/constants/receivables-sample'
import type { ReceivableFormValues } from '@/features/bills/schemas/receivable-form.schema'
import type { BillStatus } from '@/features/bills/types/bill.types'
import type { Receivable, ReceivableOfMonth } from '@/features/bills/types/receivable.types'
import {
  describeReceivableDue,
  getReceivablesOfMonth,
  toggleReceivableReceivedInMonth,
} from '@/features/bills/utils/receivables-of-month'
import { Button } from '@/shared/components/Button/Button'
import { List } from '@/shared/components/List/List'
import { Modal } from '@/shared/components/Modal/Modal'
import { Money } from '@/shared/components/Money/Money'
import { Skeleton } from '@/shared/components/Skeleton/Skeleton'
import { useTodayIsoDate } from '@/shared/hooks/useTodayIsoDate'
import { useToast } from '@/shared/hooks/useToast'
import { formatCurrency } from '@/shared/utils/format-currency'

import styles from './ReceivablesSection.module.scss'

const STATUS_LABELS: Record<BillStatus, string> = {
  overdue: 'Atrasado',
  pending: 'A receber',
  paid: 'Recebido',
}

// Money coming back to the user this month (loans, sales paid in installments).
// Visual phase: changes only update this local list (simulated).
export function ReceivablesSection() {
  const [receivables, setReceivables] = useState(SAMPLE_RECEIVABLES)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingReceivable, setEditingReceivable] = useState<Receivable | null>(null)
  const [receivableToDelete, setReceivableToDelete] = useState<Receivable | null>(null)
  const todayIsoDate = useTodayIsoDate()
  const { highlightedId, highlight } = useRowHighlight()
  const { showToast } = useToast()
  const titleId = useId()

  function handleOpenCreate() {
    setEditingReceivable(null)
    setIsFormOpen(true)
  }

  function handleOpenEdit(receivable: Receivable) {
    setEditingReceivable(receivable)
    setIsFormOpen(true)
  }

  // Pending backend integration: create/update through the receivables service.
  function handleSubmit(values: ReceivableFormValues) {
    if (editingReceivable) {
      const updatedReceivable = { ...editingReceivable, ...values }
      setReceivables((current) =>
        current.map((receivable) => (receivable.id === updatedReceivable.id ? updatedReceivable : receivable)),
      )
      showToast({ tone: 'success', title: 'Valor a receber atualizado', description: values.description })
    } else {
      setReceivables((current) => [...current, { ...values, id: crypto.randomUUID(), receivedMonths: [] }])
      showToast({ tone: 'success', title: 'Valor a receber cadastrado', description: values.description })
    }

    setIsFormOpen(false)
  }

  // Pending backend integration: register the receipt through the receivables service.
  function handleToggleReceived({ receivable, status }: ReceivableOfMonth) {
    if (!todayIsoDate) {
      return
    }

    const updatedReceivable = toggleReceivableReceivedInMonth(receivable, todayIsoDate)
    setReceivables((current) =>
      current.map((currentReceivable) =>
        currentReceivable.id === updatedReceivable.id ? updatedReceivable : currentReceivable,
      ),
    )
    if (status !== 'paid') {
      highlight(receivable.id)
    }

    showToast(
      status === 'paid'
        ? { tone: 'info', title: 'Recebimento desfeito', description: receivable.description }
        : { tone: 'success', title: 'Recebimento registrado', description: receivable.description },
    )
  }

  function handleRequestDelete(receivable: Receivable) {
    setIsFormOpen(false)
    setReceivableToDelete(receivable)
  }

  // Pending backend integration: delete through the receivables service.
  function handleConfirmDelete() {
    if (!receivableToDelete) {
      return
    }

    setReceivables((current) => current.filter((receivable) => receivable.id !== receivableToDelete.id))
    showToast({ tone: 'success', title: 'Valor a receber removido', description: receivableToDelete.description })
    setReceivableToDelete(null)
  }

  // Installments depend on today's date, known only in the browser.
  const receivablesOfMonth = todayIsoDate ? getReceivablesOfMonth(receivables, todayIsoDate) : []
  const totalInCents = receivablesOfMonth.reduce((total, { amountInCents }) => total + amountInCents, 0)
  const receivedInCents = receivablesOfMonth
    .filter(({ status }) => status === 'paid')
    .reduce((total, { amountInCents }) => total + amountInCents, 0)

  function renderList() {
    if (!todayIsoDate) {
      return <Skeleton shape="block" height="160px" />
    }

    if (receivablesOfMonth.length === 0) {
      return <p className={styles.empty}>Nada para receber este mês.</p>
    }

    return (
      <List label="Valores a receber">
        {receivablesOfMonth.map((receivableOfMonth) => {
          const { receivable, amountInCents, status } = receivableOfMonth
          const title = `${receivable.description} · ${receivable.payerName}`

          return (
            <MonthEntryRow
              key={receivable.id}
              icon={HandCoins}
              status={status}
              title={title}
              description={describeReceivableDue(receivableOfMonth)}
              amount={<Money amountInCents={amountInCents} size="sm" tone="signed" />}
              badgeLabel={STATUS_LABELS[status]}
              onOpen={() => handleOpenEdit(receivable)}
              doneActionLabel="Recebi"
              doneActionAriaLabel={`Marcar ${title} como recebido`}
              undoActionAriaLabel={`Desfazer recebimento de ${title}`}
              onToggleDone={() => handleToggleReceived(receivableOfMonth)}
              isHighlighted={receivable.id === highlightedId}
            />
          )
        })}
      </List>
    )
  }

  return (
    <section className={styles.section} aria-labelledby={titleId}>
      <header className={styles.header}>
        <div>
          <h2 id={titleId} className={styles.title}>
            Valores a receber
          </h2>
          {receivablesOfMonth.length > 0 && (
            <p className={styles.subtitle}>
              {formatCurrency(receivedInCents)} de {formatCurrency(totalInCents)} recebidos este mês
            </p>
          )}
        </div>
        <Button size="sm" variant="outline" onClick={handleOpenCreate}>
          <Plus size={16} aria-hidden="true" />
          Adicionar
        </Button>
      </header>

      {renderList()}

      <ReceivableFormModal
        isOpen={isFormOpen}
        receivable={editingReceivable}
        todayIsoDate={todayIsoDate}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleSubmit}
        onDelete={handleRequestDelete}
      />

      <Modal
        isOpen={receivableToDelete !== null}
        onClose={() => setReceivableToDelete(null)}
        title={`Remover ${receivableToDelete?.description ?? 'valor a receber'}?`}
        description="As parcelas que ainda faltam deixam de aparecer."
        footer={
          <>
            <Button variant="outline" onClick={() => setReceivableToDelete(null)}>
              Cancelar
            </Button>
            <Button variant="danger" onClick={handleConfirmDelete}>
              Remover
            </Button>
          </>
        }
      />
    </section>
  )
}
