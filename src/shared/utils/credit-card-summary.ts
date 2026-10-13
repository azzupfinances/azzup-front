import type {
  CardPurchase,
  CreditCard,
  CreditCardSummary,
  Installment,
  PurchaseProgress,
} from '@/shared/types/credit-card.types'
import { buildInstallments } from '@/shared/utils/installments'
import { getIsoMonth } from '@/shared/utils/iso-date'

// No bill cycles yet: an installment counts as paid once its month is over. The current
// month's installments are still pending, so they are part of the committed amount.
export function isInstallmentPending(installment: Installment, todayIsoDate: string) {
  return getIsoMonth(installment.dueDate) >= getIsoMonth(todayIsoDate)
}

function sumInstallments(installments: Installment[]) {
  return installments.reduce((total, installment) => total + installment.amountInCents, 0)
}

export function summarizeCreditCard(
  card: CreditCard,
  purchases: CardPurchase[],
  todayIsoDate: string,
): CreditCardSummary {
  const currentMonth = getIsoMonth(todayIsoDate)
  const installments = purchases
    .filter((purchase) => purchase.creditCardId === card.id)
    .flatMap(buildInstallments)
  const pendingInstallments = installments.filter((installment) =>
    isInstallmentPending(installment, todayIsoDate),
  )
  const committedInCents = sumInstallments(pendingInstallments)
  const lastInstallmentDate = pendingInstallments.reduce<string | null>(
    (latest, installment) => (latest === null || installment.dueDate > latest ? installment.dueDate : latest),
    null,
  )

  return {
    limitInCents: card.limitInCents,
    committedInCents,
    availableInCents: card.limitInCents - committedInCents,
    currentMonthInCents: sumInstallments(
      installments.filter((installment) => getIsoMonth(installment.dueDate) === currentMonth),
    ),
    lastInstallmentDate,
  }
}

// Purchases of the card that still have pending installments, the ones ending first on top.
export function getActivePurchasesProgress(
  cardId: string,
  purchases: CardPurchase[],
  todayIsoDate: string,
): PurchaseProgress[] {
  return purchases
    .filter((purchase) => purchase.creditCardId === cardId)
    .flatMap((purchase) => {
      const installments = buildInstallments(purchase)
      const pendingInstallments = installments.filter((installment) =>
        isInstallmentPending(installment, todayIsoDate),
      )

      if (pendingInstallments.length === 0) {
        return []
      }

      return [
        {
          purchase,
          paidCount: installments.length - pendingInstallments.length,
          remainingCount: pendingInstallments.length,
          remainingInCents: sumInstallments(pendingInstallments),
          nextInstallmentInCents: pendingInstallments[0].amountInCents,
          lastInstallmentDate: pendingInstallments[pendingInstallments.length - 1].dueDate,
        },
      ]
    })
    .sort((first, second) => first.lastInstallmentDate.localeCompare(second.lastInstallmentDate))
}
