import { ArrowDownLeft, ArrowUpRight } from 'lucide-react'

import { Money } from '@/shared/components/Money/Money'

import styles from './YearSummary.module.scss'

type YearSummaryProps = {
  year: number
  incomeInCents: number
  expensesInCents: number
  savedInCents: number
  savedPercentage: number
}

// Hero of the year screen: what was kept is the headline, the flows support it.
export function YearSummary({ year, incomeInCents, expensesInCents, savedInCents, savedPercentage }: YearSummaryProps) {
  return (
    <section className={styles.card} aria-label={`Resumo de ${year}`}>
      <div className={styles.headline}>
        <span className={styles.label}>Você guardou em {year}</span>
        <Money amountInCents={savedInCents} size="xl" className={styles.savedValue} />
        <span className={styles.share}>{savedPercentage}% de tudo o que entrou</span>
      </div>

      <dl className={styles.flows}>
        <div className={styles.flow}>
          <dt className={styles.flowLabel}>
            <span className={styles.flowIcon}>
              <ArrowDownLeft size={16} aria-hidden="true" />
            </span>
            Entrou
          </dt>
          <dd>
            <Money amountInCents={incomeInCents} size="lg" className={styles.flowValue} />
          </dd>
        </div>
        <div className={styles.flow}>
          <dt className={styles.flowLabel}>
            <span className={styles.flowIcon}>
              <ArrowUpRight size={16} aria-hidden="true" />
            </span>
            Saiu
          </dt>
          <dd>
            <Money amountInCents={expensesInCents} size="lg" className={styles.flowValue} />
          </dd>
        </div>
      </dl>
    </section>
  )
}
