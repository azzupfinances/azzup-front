import { CalendarHeart } from 'lucide-react'
import type { CSSProperties } from 'react'

import { SAMPLE_MONTH_SUMMARY, SAMPLE_PAYDAY } from '@/features/dashboard/constants/dashboard-sample'
import { Money } from '@/shared/components/Money/Money'

import styles from './PaydayCard.module.scss'

// "How much can I still spend until the next salary" — the core question for CLT workers.
export function PaydayCard() {
  const { daysUntilPayday, paydayLabel, cycleProgressPercentage } = SAMPLE_PAYDAY
  const availableInCents = SAMPLE_MONTH_SUMMARY.incomeInCents - SAMPLE_MONTH_SUMMARY.expensesInCents
  const dailyBudgetInCents = Math.floor(availableInCents / daysUntilPayday)

  return (
    <section className={styles.card} aria-label="Até o próximo salário">
      <div className={styles.header}>
        <span className={styles.icon} aria-hidden="true">
          <CalendarHeart size={20} />
        </span>
        <div>
          <p className={styles.title}>Faltam {daysUntilPayday} dias</p>
          <p className={styles.subtitle}>para o salário ({paydayLabel})</p>
        </div>
      </div>

      <div
        className={styles.progress}
        role="progressbar"
        aria-label="Ciclo do salário"
        aria-valuenow={cycleProgressPercentage}
        aria-valuemin={0}
        aria-valuemax={100}
        style={{ '--progress': `${cycleProgressPercentage}%` } as CSSProperties}
      />

      <dl className={styles.figures}>
        <div className={styles.figure}>
          <dt>Livre para gastar</dt>
          <dd>
            <Money amountInCents={availableInCents} size="lg" />
          </dd>
        </div>
        <div className={styles.figure}>
          <dt>Por dia, até lá</dt>
          <dd>
            <Money amountInCents={dailyBudgetInCents} size="lg" />
          </dd>
        </div>
      </dl>
    </section>
  )
}
