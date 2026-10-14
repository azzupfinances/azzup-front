import { CircleCheck, Hourglass, Wallet } from 'lucide-react'

import type { PaymentsMonthSummary } from '@/features/bills/types/bill.types'
import { AnimatedMoney } from '@/shared/components/AnimatedMoney/AnimatedMoney'
import { classNames } from '@/shared/utils/class-names'

import styles from './PaymentsSummary.module.scss'

type PaymentsSummaryProps = {
  summary: PaymentsMonthSummary
  paidCount: number
  paymentsCount: number
}

export function PaymentsSummary({ summary, paidCount, paymentsCount }: PaymentsSummaryProps) {
  const paidPercentage = summary.totalInCents > 0 ? (summary.paidInCents / summary.totalInCents) * 100 : 0

  return (
    <section className={styles.summary} aria-label="Resumo dos pagamentos do mês">
      <dl className={styles.figures}>
        <div className={styles.item}>
          <dt className={styles.label}>
            <span className={styles.icon} aria-hidden="true">
              <Wallet size={16} />
            </span>
            Total do mês
          </dt>
          <dd>
            <AnimatedMoney amountInCents={summary.totalInCents} size="lg" />
          </dd>
        </div>

        <div className={styles.item}>
          <dt className={styles.label}>
            <span className={classNames(styles.icon, styles.paid)} aria-hidden="true">
              <CircleCheck size={16} />
            </span>
            Já pago
          </dt>
          <dd>
            <AnimatedMoney amountInCents={summary.paidInCents} size="lg" />
          </dd>
        </div>

        <div className={styles.item}>
          <dt className={styles.label}>
            <span className={classNames(styles.icon, styles.remaining)} aria-hidden="true">
              <Hourglass size={16} />
            </span>
            Falta pagar
          </dt>
          <dd>
            <AnimatedMoney amountInCents={summary.remainingInCents} size="lg" />
          </dd>
        </div>
      </dl>

      <div className={styles.progress}>
        <div
          className={styles.track}
          role="progressbar"
          aria-label="Valor já pago no mês"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(paidPercentage)}
        >
          {/* Width depends on runtime data, so it cannot live in the stylesheet. */}
          <span className={styles.bar} style={{ width: `${paidPercentage}%` }} />
        </div>
        <p className={styles.progressLabel}>
          {paidCount} de {paymentsCount} pagas
          {summary.overdueCount > 0 && (
            <span className={styles.overdue}>
              {' · '}
              {summary.overdueCount} {summary.overdueCount === 1 ? 'atrasada' : 'atrasadas'}
            </span>
          )}
        </p>
      </div>
    </section>
  )
}
