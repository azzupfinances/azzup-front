import type { CSSProperties } from 'react'

import type { SampleMonthResult } from '@/features/dashboard/constants/dashboard-sample'
import { classNames } from '@/shared/utils/class-names'
import { formatCurrency } from '@/shared/utils/format-currency'

import styles from './YearSavingsChart.module.scss'

const MONTHS_IN_YEAR = 12

const longMonthFormatter = new Intl.DateTimeFormat('pt-BR', { month: 'long' })
const shortMonthFormatter = new Intl.DateTimeFormat('pt-BR', { month: 'short' })

function getMonthNames(monthIndex: number) {
  const date = new Date(2000, monthIndex, 1)

  return {
    long: longMonthFormatter.format(date),
    // "jan." → "jan"
    short: shortMonthFormatter.format(date).replace('.', ''),
  }
}

type YearSavingsChartProps = {
  months: SampleMonthResult[]
  // Gets the only direct label, so the chart is not covered in numbers.
  bestMonthIndex: number
}

// One series (amount saved per month), so it has no legend: the title names it.
// Values show on hover/focus; the last started month is partial, later months are empty.
export function YearSavingsChart({ months, bestMonthIndex }: YearSavingsChartProps) {
  const savedByMonth = new Map(
    months.map((month) => [month.monthIndex, month.incomeInCents - month.expensesInCents]),
  )
  const currentMonthIndex = Math.max(...months.map((month) => month.monthIndex))
  const maxSavedInCents = Math.max(...savedByMonth.values(), 1)

  return (
    <ol className={styles.chart} aria-label="Quanto você guardou em cada mês">
      {Array.from({ length: MONTHS_IN_YEAR }, (_, monthIndex) => {
        const savedInCents = savedByMonth.get(monthIndex)
        const names = getMonthNames(monthIndex)

        if (savedInCents === undefined) {
          return (
            <li key={monthIndex} className={styles.column} aria-label={`${names.long}: ainda não chegou`}>
              <span className={styles.track}>
                <span className={styles.futureBar} />
              </span>
              <span className={classNames(styles.monthLabel, styles.isMuted)} aria-hidden="true">
                {names.short}
              </span>
            </li>
          )
        }

        const isCurrent = monthIndex === currentMonthIndex
        const isBest = monthIndex === bestMonthIndex
        const heightPercentage = Math.max((Math.max(savedInCents, 0) / maxSavedInCents) * 100, 2)
        const valueLabel = `${isCurrent ? 'até agora, ' : ''}guardou ${formatCurrency(savedInCents)}`

        return (
          <li
            key={monthIndex}
            className={styles.column}
            tabIndex={0}
            aria-label={`${names.long}: ${valueLabel}`}
            style={{ '--index': monthIndex } as CSSProperties}
          >
            <span className={styles.track}>
              <span
                className={classNames(styles.bar, isCurrent && styles.isPartial, isBest && styles.isBest)}
                style={{ '--height': `${heightPercentage}%` } as CSSProperties}
              >
                {isBest && <span className={styles.directLabel}>{formatCurrency(savedInCents)}</span>}
              </span>
              <span className={styles.tooltip} aria-hidden="true">
                <span className={styles.tooltipMonth}>
                  {names.long}
                  {isCurrent && ' (parcial)'}
                </span>
                {formatCurrency(savedInCents)}
              </span>
            </span>
            <span className={styles.monthLabel} aria-hidden="true">
              {names.short}
            </span>
          </li>
        )
      })}
    </ol>
  )
}
