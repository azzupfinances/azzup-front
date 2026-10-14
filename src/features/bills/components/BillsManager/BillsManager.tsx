'use client'

import { CalendarClock, Plus } from 'lucide-react'
import { useState } from 'react'

import { BillFormModal } from '@/features/bills/components/BillFormModal/BillFormModal'
import { PaymentsGroup } from '@/features/bills/components/PaymentsGroup/PaymentsGroup'
import { PaymentsSummary } from '@/features/bills/components/PaymentsSummary/PaymentsSummary'
import { ReceivablesSection } from '@/features/bills/components/ReceivablesSection/ReceivablesSection'
import { useRowHighlight } from '@/features/bills/hooks/useRowHighlight'
import { SAMPLE_BILLS } from '@/features/bills/constants/bills-sample'
import type { BillFormValues } from '@/features/bills/schemas/bill-form.schema'
import type { Bill, PaymentOfMonth } from '@/features/bills/types/bill.types'
import {
  BILL_STATUS_ORDER,
  getPaymentsOfMonth,
  summarizePaymentsOfMonth,
  toggleBillPaidInMonth,
} from '@/features/bills/utils/payments-of-month'
import { Button } from '@/shared/components/Button/Button'
import { EmptyState } from '@/shared/components/EmptyState/EmptyState'
import { Modal } from '@/shared/components/Modal/Modal'
import { PageHeader } from '@/shared/components/PageHeader/PageHeader'
import { Reveal } from '@/shared/components/Reveal/Reveal'
import { Skeleton } from '@/shared/components/Skeleton/Skeleton'
import { useCreditCards } from '@/shared/hooks/useCreditCards'
import { useTodayIsoDate } from '@/shared/hooks/useTodayIsoDate'
import { useToast } from '@/shared/hooks/useToast'
import { getIsoMonth } from '@/shared/utils/iso-date'

import styles from './BillsManager.module.scss'

// Visual phase: bill changes only update this local list and invoice payments update the
// in-memory cards (simulated).
export function BillsManager() {
  const [bills, setBills] = useState(SAMPLE_BILLS)
  const { creditCards, purchases, toggleInvoicePaid } = useCreditCards()
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingBill, setEditingBill] = useState<Bill | null>(null)
  const [billToDelete, setBillToDelete] = useState<Bill | null>(null)
  const todayIsoDate = useTodayIsoDate()
  const { highlightedId, highlight } = useRowHighlight()
  const { showToast } = useToast()

  function handleOpenCreate() {
    setEditingBill(null)
    setIsFormOpen(true)
  }

  function handleOpenEdit({ source }: PaymentOfMonth) {
    if (source.kind !== 'bill') {
      return
    }

    setEditingBill(source.bill)
    setIsFormOpen(true)
  }

  // Pending backend integration: create/update through the bills service.
  function handleSubmit(values: BillFormValues) {
    if (editingBill) {
      const updatedBill = { ...editingBill, ...values }
      setBills((current) => current.map((bill) => (bill.id === updatedBill.id ? updatedBill : bill)))
      showToast({ tone: 'success', title: 'Conta atualizada', description: values.name })
    } else {
      setBills((current) => [...current, { ...values, id: crypto.randomUUID(), paidMonths: [] }])
      showToast({ tone: 'success', title: 'Conta cadastrada', description: values.name })
    }

    setIsFormOpen(false)
  }

  // Pending backend integration: register the payment through the bills / credit cards service.
  function handleTogglePaid({ id, name, source, status }: PaymentOfMonth) {
    if (!todayIsoDate) {
      return
    }

    if (source.kind === 'creditCardInvoice') {
      toggleInvoicePaid(source.creditCard.id, getIsoMonth(todayIsoDate))
    } else {
      const updatedBill = toggleBillPaidInMonth(source.bill, todayIsoDate)
      setBills((current) => current.map((bill) => (bill.id === updatedBill.id ? updatedBill : bill)))
    }

    if (status !== 'paid') {
      highlight(id)
    }

    showToast(
      status === 'paid'
        ? { tone: 'info', title: 'Pagamento desfeito', description: name }
        : { tone: 'success', title: 'Pagamento registrado', description: name },
    )
  }

  function handleRequestDelete(bill: Bill) {
    setIsFormOpen(false)
    setBillToDelete(bill)
  }

  // Pending backend integration: delete through the bills service.
  function handleConfirmDelete() {
    if (!billToDelete) {
      return
    }

    setBills((current) => current.filter((bill) => bill.id !== billToDelete.id))
    showToast({ tone: 'success', title: 'Conta removida', description: billToDelete.name })
    setBillToDelete(null)
  }

  function renderContent() {
    // Statuses and invoices depend on today's date, known only in the browser.
    if (!todayIsoDate) {
      return (
        <div className={styles.content} aria-busy="true">
          <Skeleton shape="block" height="160px" />
          <Skeleton shape="block" height="320px" />
        </div>
      )
    }

    const payments = getPaymentsOfMonth(bills, creditCards, purchases, todayIsoDate)

    if (payments.length === 0) {
      return (
        <EmptyState
          icon={CalendarClock}
          title="Nada para pagar este mês"
          description="Cadastre aluguel, internet, academia e outras despesas do mês para não perder nenhum vencimento."
          action={
            <Button variant="outline" onClick={handleOpenCreate}>
              Cadastrar conta
            </Button>
          }
        />
      )
    }

    const summary = summarizePaymentsOfMonth(payments)
    const paidCount = payments.filter(({ status }) => status === 'paid').length

    return (
      <div className={styles.content}>
        <PaymentsSummary summary={summary} paidCount={paidCount} paymentsCount={payments.length} />

        {BILL_STATUS_ORDER.map((status) => {
          const groupPayments = payments.filter((payment) => payment.status === status)

          return (
            groupPayments.length > 0 && (
              <PaymentsGroup
                key={status}
                status={status}
                payments={groupPayments}
                onOpenBill={handleOpenEdit}
                onTogglePaid={handleTogglePaid}
                highlightedPaymentId={highlightedId}
              />
            )
          )
        })}
      </div>
    )
  }

  return (
    <div className={styles.manager}>
      <Reveal>
        <PageHeader
          title="Contas fixas"
          description="Contas do mês e faturas dos cartões: veja o que já foi pago e o que está para vencer."
          actions={
            <Button onClick={handleOpenCreate}>
              <Plus size={18} aria-hidden="true" />
              Nova conta fixa
            </Button>
          }
        />
      </Reveal>

      <Reveal delay={100}>{renderContent()}</Reveal>

      <Reveal delay={200}>
        <ReceivablesSection />
      </Reveal>

      <BillFormModal
        isOpen={isFormOpen}
        bill={editingBill}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleSubmit}
        onDelete={handleRequestDelete}
      />

      <Modal
        isOpen={billToDelete !== null}
        onClose={() => setBillToDelete(null)}
        title={`Remover ${billToDelete?.name ?? 'conta'}?`}
        description="Ela deixa de aparecer nos próximos meses."
        footer={
          <>
            <Button variant="outline" onClick={() => setBillToDelete(null)}>
              Cancelar
            </Button>
            <Button variant="danger" onClick={handleConfirmDelete}>
              Remover conta
            </Button>
          </>
        }
      />
    </div>
  )
}
