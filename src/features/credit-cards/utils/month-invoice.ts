import type { CardPurchase, Installment } from '@/shared/types/credit-card.types'
import { buildInstallments } from '@/shared/utils/installments'
import { getIsoMonth } from '@/shared/utils/iso-date'

export type InvoiceEntry = {
  purchase: CardPurchase
  installment: Installment
}

// What the card charges in the month of `todayIsoDate`: one installment per purchase, newest first.
export function getMonthInvoiceEntries(
  creditCardId: string,
  purchases: CardPurchase[],
  todayIsoDate: string,
): InvoiceEntry[] {
  const month = getIsoMonth(todayIsoDate)

  return purchases
    .filter((purchase) => purchase.creditCardId === creditCardId)
    .flatMap((purchase) =>
      buildInstallments(purchase)
        .filter((installment) => getIsoMonth(installment.dueDate) === month)
        .map((installment) => ({ purchase, installment })),
    )
    .sort((first, second) => second.installment.dueDate.localeCompare(first.installment.dueDate))
}
