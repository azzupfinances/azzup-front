import { ArrowDownLeft, ArrowUpRight, Scale } from 'lucide-react'

import { Money } from '@/shared/components/Money/Money'
import { classNames } from '@/shared/utils/class-names'

import styles from './TransactionsSummary.module.scss'

type TransactionsSummaryProps = {
  incomeInCents: number
  expensesInCents: number
  balanceInCents: number
}

export function TransactionsSummary({ incomeInCents, expensesInCents, balanceInCents }: TransactionsSummaryProps) {
  return (
    <dl className={styles.summary}>
      <div className={styles.item}>
        <dt className={styles.label}>
          <span className={classNames(styles.icon, styles.income)} aria-hidden="true">
            <ArrowDownLeft size={16} />
          </span>
          Entradas
        </dt>
        <dd>
          <Money amountInCents={incomeInCents} size="lg" />
        </dd>
      </div>

      <div className={styles.item}>
        <dt className={styles.label}>
          <span className={classNames(styles.icon, styles.expense)} aria-hidden="true">
            <ArrowUpRight size={16} />
          </span>
          Saídas
        </dt>
        <dd>
          <Money amountInCents={expensesInCents} size="lg" />
        </dd>
      </div>

      <div className={styles.item}>
        <dt className={styles.label}>
          <span className={styles.icon} aria-hidden="true">
            <Scale size={16} />
          </span>
          Saldo
        </dt>
        <dd>
          <Money amountInCents={balanceInCents} size="lg" tone="signed" />
        </dd>
      </div>
    </dl>
  )
}
