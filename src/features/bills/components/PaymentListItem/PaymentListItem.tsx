import { CreditCard as CreditCardIcon } from 'lucide-react'

import { MonthEntryRow } from '@/features/bills/components/MonthEntryRow/MonthEntryRow'
import type { BillStatus, PaymentOfMonth } from '@/features/bills/types/bill.types'
import { describePaymentDue } from '@/features/bills/utils/payments-of-month'
import { Money } from '@/shared/components/Money/Money'
import { getCreditCardHref } from '@/shared/constants/routes'
import { TRANSACTION_CATEGORIES } from '@/shared/constants/transaction-categories'

const STATUS_LABELS: Record<BillStatus, string> = {
  overdue: 'Atrasada',
  pending: 'Pendente',
  paid: 'Paga',
}

type PaymentListItemProps = {
  payment: PaymentOfMonth
  onOpenBill: (payment: PaymentOfMonth) => void
  onTogglePaid: (payment: PaymentOfMonth) => void
  isHighlighted?: boolean
}

// A bill opens for editing; an invoice opens the cards screen.
export function PaymentListItem({ payment, onOpenBill, onTogglePaid, isHighlighted }: PaymentListItemProps) {
  const { name, amountInCents, source, status } = payment
  const category = source.kind === 'bill' ? TRANSACTION_CATEGORIES[source.bill.categoryId] : null

  return (
    <MonthEntryRow
      icon={category?.icon ?? CreditCardIcon}
      status={status}
      title={name}
      description={`${category?.label ?? 'Cartão de crédito'} · ${describePaymentDue(payment)}`}
      amount={<Money amountInCents={amountInCents} size="sm" />}
      badgeLabel={STATUS_LABELS[status]}
      href={source.kind === 'creditCardInvoice' ? getCreditCardHref(source.creditCard.id) : undefined}
      onOpen={() => onOpenBill(payment)}
      doneActionLabel="Pagar"
      doneActionAriaLabel={`Marcar ${name} como paga`}
      undoActionAriaLabel={`Desfazer pagamento de ${name}`}
      onToggleDone={() => onTogglePaid(payment)}
      isHighlighted={isHighlighted}
    />
  )
}
