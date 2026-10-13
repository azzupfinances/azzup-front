import { Money } from '@/shared/components/Money/Money'
import { TRANSACTION_CATEGORIES } from '@/shared/constants/transaction-categories'
import type { PurchaseProgress } from '@/shared/types/credit-card.types'
import { formatCurrency } from '@/shared/utils/format-currency'
import { formatMonthYear } from '@/shared/utils/format-month-year'

import styles from './CardPurchaseItem.module.scss'

type CardPurchaseItemProps = {
  progress: PurchaseProgress
}

// One purchase still being paid: installment amount, how many are left and when it ends.
export function CardPurchaseItem({ progress }: CardPurchaseItemProps) {
  const { purchase, paidCount, remainingCount, remainingInCents, nextInstallmentInCents, lastInstallmentDate } =
    progress
  const category = TRANSACTION_CATEGORIES[purchase.categoryId]
  const isSinglePayment = purchase.installmentsCount === 1

  return (
    <li className={styles.item}>
      <span className={styles.icon} aria-hidden="true">
        <category.icon size={18} />
      </span>

      <div className={styles.content}>
        <div className={styles.header}>
          <p className={styles.title}>{purchase.description}</p>
          <Money amountInCents={remainingInCents} size="sm" />
        </div>
        <p className={styles.subtitle}>
          {isSinglePayment ? 'À vista' : `${purchase.installmentsCount}x`} · total de{' '}
          {formatCurrency(purchase.totalInCents)}
        </p>

        <dl className={styles.figures}>
          <div className={styles.figure}>
            <dt>Parcela</dt>
            <dd>{formatCurrency(nextInstallmentInCents)}</dd>
          </div>
          <div className={styles.figure}>
            <dt>Restam</dt>
            <dd>
              {remainingCount} de {purchase.installmentsCount}
              <span className="sr-only">, {paidCount} já pagas</span>
            </dd>
          </div>
          <div className={styles.figure}>
            <dt>{isSinglePayment ? 'Fatura' : 'Termina em'}</dt>
            <dd>{formatMonthYear(lastInstallmentDate)}</dd>
          </div>
        </dl>
      </div>
    </li>
  )
}
