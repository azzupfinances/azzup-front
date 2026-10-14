import type { BillStatus } from '@/features/bills/types/bill.types'
import type { Receivable, ReceivableOfMonth } from '@/features/bills/types/receivable.types'
import { splitIntoInstallments } from '@/shared/utils/installments'
import {
  addMonthsToIsoDate,
  getDaysBetweenIsoDates,
  getIsoMonth,
  getMonthsBetweenIsoDates,
} from '@/shared/utils/iso-date'

// The installment each receivable expects this month, sorted by date. Receivables not started
// yet or already finished are left out.
export function getReceivablesOfMonth(receivables: Receivable[], todayIsoDate: string): ReceivableOfMonth[] {
  const month = getIsoMonth(todayIsoDate)

  return receivables
    .flatMap((receivable) => {
      const installmentIndex = getMonthsBetweenIsoDates(receivable.firstDueDate, todayIsoDate)

      if (installmentIndex < 0 || installmentIndex >= receivable.installmentsCount) {
        return []
      }

      const dueDate = addMonthsToIsoDate(receivable.firstDueDate, installmentIndex)
      const daysUntilDue = getDaysBetweenIsoDates(todayIsoDate, dueDate)
      const status: BillStatus = receivable.receivedMonths.includes(month)
        ? 'paid'
        : daysUntilDue < 0
          ? 'overdue'
          : 'pending'

      return [
        {
          receivable,
          installmentNumber: installmentIndex + 1,
          amountInCents: splitIntoInstallments(receivable.totalInCents, receivable.installmentsCount)[installmentIndex],
          dueDate,
          daysUntilDue,
          status,
        },
      ]
    })
    .sort((first, second) => first.dueDate.localeCompare(second.dueDate))
}

// Adds or removes the current month from the receivable's received months.
export function toggleReceivableReceivedInMonth(receivable: Receivable, todayIsoDate: string): Receivable {
  const month = getIsoMonth(todayIsoDate)

  return {
    ...receivable,
    receivedMonths: receivable.receivedMonths.includes(month)
      ? receivable.receivedMonths.filter((receivedMonth) => receivedMonth !== month)
      : [...receivable.receivedMonths, month],
  }
}

// "Parcela 5 de 10 · chega em 2 dias", "Parcela 2 de 3 · atrasou 8 dias".
export function describeReceivableDue({
  receivable,
  installmentNumber,
  daysUntilDue,
  status,
}: ReceivableOfMonth) {
  const installment =
    receivable.installmentsCount === 1
      ? 'Parcela única'
      : `Parcela ${installmentNumber} de ${receivable.installmentsCount}`

  if (status === 'paid') {
    return `${installment} · recebida`
  }

  if (daysUntilDue === 0) {
    return `${installment} · chega hoje`
  }

  if (daysUntilDue === 1) {
    return `${installment} · chega amanhã`
  }

  if (daysUntilDue < 0) {
    return `${installment} · atrasou ${-daysUntilDue} ${daysUntilDue === -1 ? 'dia' : 'dias'}`
  }

  return `${installment} · chega em ${daysUntilDue} dias`
}
