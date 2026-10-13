import type { CardPurchase, Installment } from '@/shared/types/credit-card.types'
import { addMonthsToIsoDate } from '@/shared/utils/iso-date'

// Splits an amount in cents into `count` integer parts that always add up to the total:
// each part is `total DIV count` and the remainder adds 1 cent to the first parts
// (R$ 100,00 in 3x → 33,34 + 33,33 + 33,33).
export function splitIntoInstallments(totalInCents: number, count: number) {
  if (!Number.isInteger(totalInCents) || totalInCents < 0) {
    throw new RangeError('totalInCents must be a non-negative integer.')
  }

  if (!Number.isInteger(count) || count < 1) {
    throw new RangeError('count must be a positive integer.')
  }

  const baseAmount = Math.floor(totalInCents / count)
  const remainder = totalInCents % count

  return Array.from({ length: count }, (_, index) => baseAmount + (index < remainder ? 1 : 0))
}

// Installment N falls on the purchase day, N - 1 months later.
export function buildInstallments(purchase: CardPurchase): Installment[] {
  return splitIntoInstallments(purchase.totalInCents, purchase.installmentsCount).map(
    (amountInCents, index) => ({
      purchaseId: purchase.id,
      number: index + 1,
      amountInCents,
      dueDate: addMonthsToIsoDate(purchase.purchaseDate, index),
    }),
  )
}
