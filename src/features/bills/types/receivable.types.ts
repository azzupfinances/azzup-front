import type { BillStatus } from '@/features/bills/types/bill.types'

// Money someone owes the user, paid back in monthly installments (a loan to a friend, a sale).
export type Receivable = {
  id: string
  description: string
  // Who pays it back.
  payerName: string
  totalInCents: number
  installmentsCount: number
  // ISO date of the first installment; installment N falls N - 1 months later.
  firstDueDate: string
  // Months ("YYYY-MM") whose installment was already received.
  receivedMonths: string[]
}

// The installment of a receivable that falls in the current month. `paid` means received.
export type ReceivableOfMonth = {
  receivable: Receivable
  // 1-based position in the series.
  installmentNumber: number
  amountInCents: number
  dueDate: string
  // Negative once the expected date has passed.
  daysUntilDue: number
  status: BillStatus
}
