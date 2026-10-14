import { ArrowDownLeft, ArrowUpRight, Scale } from 'lucide-react'
import type { CSSProperties } from 'react'

import { AnimatedMoney } from '@/shared/components/AnimatedMoney/AnimatedMoney'
import { classNames } from '@/shared/utils/class-names'

import styles from './TransactionsSummary.module.scss'

// Share of the income already spent from which the bar warns the user.
const WARNING_SPENT_PERCENTAGE = 80

type TransactionsSummaryProps = {
  incomeInCents: number
  expensesInCents: number
  balanceInCents: number
}

function describeSpending(spentPercentage: number) {
  if (spentPercentage > 100) {
    return `Você gastou ${spentPercentage - 100}% a mais do que entrou`
  }

  return `Você gastou ${spentPercentage}% do que entrou`
}

export function TransactionsSummary({ incomeInCents, expensesInCents, balanceInCents }: TransactionsSummaryProps) {
  const spentPercentage = incomeInCents > 0 ? Math.round((expensesInCents / incomeInCents) * 100) : null
  const spendingTone =
    spentPercentage === null || spentPercentage > 100
      ? styles.danger
      : spentPercentage >= WARNING_SPENT_PERCENTAGE
        ? styles.warning
        : undefined

  return (
    <section className={styles.summary} aria-label="Resumo do mês">
      <dl className={styles.figures}>
        <div className={styles.item}>
          <dt className={styles.label}>
            <span className={classNames(styles.icon, styles.income)} aria-hidden="true">
              <ArrowDownLeft size={16} />
            </span>
            Entradas
          </dt>
          <dd>
            <AnimatedMoney amountInCents={incomeInCents} size="lg" />
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
            <AnimatedMoney amountInCents={expensesInCents} size="lg" />
          </dd>
        </div>

        <div className={styles.item}>
          <dt className={styles.label}>
            <span className={classNames(styles.icon, styles.balance)} aria-hidden="true">
              <Scale size={16} />
            </span>
            Saldo
          </dt>
          <dd>
            <AnimatedMoney amountInCents={balanceInCents} size="lg" tone="signed" />
          </dd>
        </div>
      </dl>

      <div className={styles.spending}>
        <div
          className={classNames(styles.track, spendingTone)}
          role="progressbar"
          aria-label="Parte das entradas já gasta"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.min(100, spentPercentage ?? 100)}
          // Width depends on runtime data, so it cannot live in the stylesheet.
          style={{ '--spent': `${Math.min(100, spentPercentage ?? 100)}%` } as CSSProperties}
        />
        <p className={styles.spendingLabel}>
          {spentPercentage === null ? 'Nenhuma entrada este mês ainda' : describeSpending(spentPercentage)}
        </p>
      </div>
    </section>
  )
}
