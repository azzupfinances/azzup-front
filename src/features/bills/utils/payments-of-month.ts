import type {
  Bill,
  BillStatus,
  PaymentOfMonth,
  PaymentSource,
  PaymentsMonthSummary,
} from '@/features/bills/types/bill.types'
import type { CardPurchase, CreditCard } from '@/shared/types/credit-card.types'
import { summarizeCreditCard } from '@/shared/utils/credit-card-summary'
import { getDaysBetweenIsoDates, getIsoMonth, parseIsoDate, toIsoDate } from '@/shared/utils/iso-date'

export const BILL_STATUS_ORDER: BillStatus[] = ['overdue', 'pending', 'paid']

type PaymentInput = {
  id: string
  name: string
  amountInCents: number
  dueDay: number
  isPaid: boolean
  source: PaymentSource
}

// Due date in today's month; the 31st falls on the 30th in shorter months.
function getDueDateInMonth(dueDay: number, todayIsoDate: string) {
  const today = parseIsoDate(todayIsoDate)
  const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate()

  return toIsoDate(new Date(today.getFullYear(), today.getMonth(), Math.min(dueDay, lastDayOfMonth)))
}

function toPaymentOfMonth({ isPaid, ...payment }: PaymentInput, todayIsoDate: string): PaymentOfMonth {
  const dueDate = getDueDateInMonth(payment.dueDay, todayIsoDate)
  const daysUntilDue = getDaysBetweenIsoDates(todayIsoDate, dueDate)
  const status: BillStatus = isPaid ? 'paid' : daysUntilDue < 0 ? 'overdue' : 'pending'

  return { ...payment, status, dueDate, daysUntilDue }
}

// Fixed bills plus each card's invoice for the current month, sorted by due day. Cards with
// nothing to pay this month are left out.
export function getPaymentsOfMonth(
  bills: Bill[],
  creditCards: CreditCard[],
  purchases: CardPurchase[],
  todayIsoDate: string,
): PaymentOfMonth[] {
  const month = getIsoMonth(todayIsoDate)

  const billPayments = bills.map((bill) => ({
    id: bill.id,
    name: bill.name,
    amountInCents: bill.amountInCents,
    dueDay: bill.dueDay,
    isPaid: bill.paidMonths.includes(month),
    source: { kind: 'bill' as const, bill },
  }))

  const invoicePayments = creditCards.flatMap((creditCard) => {
    const { currentMonthInCents } = summarizeCreditCard(creditCard, purchases, todayIsoDate)

    if (currentMonthInCents === 0) {
      return []
    }

    return [
      {
        id: `invoice-${creditCard.id}`,
        name: `Fatura ${creditCard.name}`,
        amountInCents: currentMonthInCents,
        dueDay: creditCard.dueDay,
        isPaid: creditCard.paidInvoiceMonths.includes(month),
        source: { kind: 'creditCardInvoice' as const, creditCard },
      },
    ]
  })

  return [...billPayments, ...invoicePayments]
    .map((payment) => toPaymentOfMonth(payment, todayIsoDate))
    .sort((first, second) => first.dueDay - second.dueDay)
}

export function summarizePaymentsOfMonth(payments: PaymentOfMonth[]): PaymentsMonthSummary {
  return payments.reduce<PaymentsMonthSummary>(
    (summary, { amountInCents, status }) => {
      const isPaid = status === 'paid'

      return {
        totalInCents: summary.totalInCents + amountInCents,
        paidInCents: summary.paidInCents + (isPaid ? amountInCents : 0),
        remainingInCents: summary.remainingInCents + (isPaid ? 0 : amountInCents),
        overdueCount: summary.overdueCount + (status === 'overdue' ? 1 : 0),
      }
    },
    { totalInCents: 0, paidInCents: 0, remainingInCents: 0, overdueCount: 0 },
  )
}

// Adds or removes the current month from the bill's paid months.
export function toggleBillPaidInMonth(bill: Bill, todayIsoDate: string): Bill {
  const month = getIsoMonth(todayIsoDate)

  return {
    ...bill,
    paidMonths: bill.paidMonths.includes(month)
      ? bill.paidMonths.filter((paidMonth) => paidMonth !== month)
      : [...bill.paidMonths, month],
  }
}

// "Vence amanhã", "Venceu há 3 dias", "Paga · vence dia 8".
export function describePaymentDue({ dueDay, status, daysUntilDue }: PaymentOfMonth) {
  if (status === 'paid') {
    return `Paga · vence dia ${dueDay}`
  }

  if (daysUntilDue === 0) {
    return 'Vence hoje'
  }

  if (daysUntilDue === 1) {
    return 'Vence amanhã'
  }

  if (daysUntilDue === -1) {
    return 'Venceu ontem'
  }

  return daysUntilDue < 0 ? `Venceu há ${-daysUntilDue} dias` : `Vence em ${daysUntilDue} dias · dia ${dueDay}`
}
