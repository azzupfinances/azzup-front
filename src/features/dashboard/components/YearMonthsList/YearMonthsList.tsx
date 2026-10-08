import { DashboardPanel } from '@/features/dashboard/components/DashboardPanel/DashboardPanel'
import type { SampleMonthResult } from '@/features/dashboard/constants/dashboard-sample'
import { getSavedInCents } from '@/features/dashboard/utils/year-stats'
import { List } from '@/shared/components/List/List'
import { ListItem } from '@/shared/components/ListItem/ListItem'
import { Money } from '@/shared/components/Money/Money'
import { formatCurrency } from '@/shared/utils/format-currency'

const monthFormatter = new Intl.DateTimeFormat('pt-BR', { month: 'long' })

type YearMonthsListProps = {
  year: number
  months: SampleMonthResult[]
}

// The chart's numbers as text, newest month first; also the accessible table view.
export function YearMonthsList({ year, months }: YearMonthsListProps) {
  const currentMonthIndex = months[months.length - 1]?.monthIndex

  return (
    <DashboardPanel title="Mês a mês">
      <List label={`Resultado de cada mês de ${year}`}>
        {[...months].reverse().map((month) => {
          const monthName = monthFormatter.format(new Date(year, month.monthIndex, 1))

          return (
            <ListItem
              key={month.monthIndex}
              title={monthName.charAt(0).toUpperCase() + monthName.slice(1)}
              description={`Entrou ${formatCurrency(month.incomeInCents)} · Saiu ${formatCurrency(month.expensesInCents)}`}
              trailing={<Money amountInCents={getSavedInCents(month)} size="sm" tone="signed" />}
              trailingDetail={month.monthIndex === currentMonthIndex ? 'Parcial' : 'Guardou'}
            />
          )
        })}
      </List>
    </DashboardPanel>
  )
}
