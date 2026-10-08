import { CalendarCheck, PiggyBank, Trophy, type LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'

import { DashboardPanel } from '@/features/dashboard/components/DashboardPanel/DashboardPanel'
import { Money } from '@/shared/components/Money/Money'
import { TRANSACTION_CATEGORIES, type CategoryId } from '@/shared/constants/transaction-categories'

import styles from './YearHighlights.module.scss'

const monthFormatter = new Intl.DateTimeFormat('pt-BR', { month: 'long' })

type YearHighlightsProps = {
  year: number
  bestMonth: { monthIndex: number; savedInCents: number }
  topCategory: { categoryId: CategoryId; amountInCents: number }
  averageSavedInCents: number
  positiveMonthsCount: number
  closedMonthsCount: number
}

export function YearHighlights({
  year,
  bestMonth,
  topCategory,
  averageSavedInCents,
  positiveMonthsCount,
  closedMonthsCount,
}: YearHighlightsProps) {
  const category = TRANSACTION_CATEGORIES[topCategory.categoryId]

  return (
    <DashboardPanel title="Destaques">
      <ul className={styles.list}>
        <Highlight icon={Trophy} label="Melhor mês">
          <span className={styles.capitalized}>
            {monthFormatter.format(new Date(year, bestMonth.monthIndex, 1))}
          </span>{' '}
          · <Money amountInCents={bestMonth.savedInCents} size="sm" />
        </Highlight>
        <Highlight icon={category.icon} label="Onde mais gastou">
          {category.label} · <Money amountInCents={topCategory.amountInCents} size="sm" />
        </Highlight>
        <Highlight icon={PiggyBank} label="Média guardada por mês">
          <Money amountInCents={averageSavedInCents} size="sm" />
        </Highlight>
        <Highlight icon={CalendarCheck} label="Meses no azul">
          {positiveMonthsCount} de {closedMonthsCount}
        </Highlight>
      </ul>
    </DashboardPanel>
  )
}

type HighlightProps = {
  icon: LucideIcon
  label: string
  children: ReactNode
}

function Highlight({ icon: Icon, label, children }: HighlightProps) {
  return (
    <li className={styles.highlight}>
      <span className={styles.icon} aria-hidden="true">
        <Icon size={18} />
      </span>
      <span className={styles.text}>
        <span className={styles.label}>{label}</span>
        <span className={styles.value}>{children}</span>
      </span>
    </li>
  )
}
