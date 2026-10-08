import { ArrowLeft } from 'lucide-react'

import { CategorySpending } from '@/features/dashboard/components/CategorySpending/CategorySpending'
import { DashboardPanel } from '@/features/dashboard/components/DashboardPanel/DashboardPanel'
import { YearHighlights } from '@/features/dashboard/components/YearHighlights/YearHighlights'
import { YearMonthsList } from '@/features/dashboard/components/YearMonthsList/YearMonthsList'
import { YearSavingsChart } from '@/features/dashboard/components/YearSavingsChart/YearSavingsChart'
import { YearSummary } from '@/features/dashboard/components/YearSummary/YearSummary'
import {
  SAMPLE_YEAR,
  SAMPLE_YEAR_CATEGORY_SPENDING,
  SAMPLE_YEAR_MONTHS,
} from '@/features/dashboard/constants/dashboard-sample'
import { getSavedInCents, getYearStats } from '@/features/dashboard/utils/year-stats'
import { Button } from '@/shared/components/Button/Button'
import { PageHeader } from '@/shared/components/PageHeader/PageHeader'
import { PeriodSwitcher } from '@/shared/components/PeriodSwitcher/PeriodSwitcher'
import { Reveal } from '@/shared/components/Reveal/Reveal'
import { SYSTEM_HOME_HREF } from '@/shared/constants/routes'

import styles from './YearDashboardPage.module.scss'

const monthFormatter = new Intl.DateTimeFormat('pt-BR', { month: 'long' })

export function YearDashboardPage() {
  const stats = getYearStats(SAMPLE_YEAR_MONTHS)
  const currentMonthName = monthFormatter.format(new Date(SAMPLE_YEAR, stats.currentMonth.monthIndex, 1))
  const topCategory = SAMPLE_YEAR_CATEGORY_SPENDING.reduce((top, item) =>
    item.amountInCents > top.amountInCents ? item : top,
  )

  return (
    <div className={styles.page}>
      <Reveal>
        <Button href={SYSTEM_HOME_HREF} variant="ghost" size="sm" className={styles.backLink}>
          <ArrowLeft size={16} aria-hidden="true" />
          Voltar para o mês
        </Button>
        <PageHeader
          title={`Seu ${SAMPLE_YEAR}`}
          description="Como está o seu ano até agora."
          actions={<PeriodSwitcher unit="year" />}
        />
      </Reveal>

      <div className={styles.grid}>
        <Reveal delay={100} className={styles.summary}>
          <YearSummary
            year={SAMPLE_YEAR}
            incomeInCents={stats.incomeInCents}
            expensesInCents={stats.expensesInCents}
            savedInCents={stats.savedInCents}
            savedPercentage={stats.savedPercentage}
          />
        </Reveal>

        <Reveal delay={200} className={styles.chart}>
          <DashboardPanel title="Quanto você guardou por mês">
            <div className={styles.chartCard}>
              <YearSavingsChart months={SAMPLE_YEAR_MONTHS} bestMonthIndex={stats.bestMonth.monthIndex} />
              <p className={styles.chartNote}>
                <span className={styles.partialSwatch} aria-hidden="true" />
                <span>
                  <span className={styles.capitalized}>{currentMonthName}</span> ainda está em andamento.
                </span>
              </p>
            </div>
          </DashboardPanel>
        </Reveal>

        <Reveal delay={300} className={styles.highlights}>
          <YearHighlights
            year={SAMPLE_YEAR}
            bestMonth={{
              monthIndex: stats.bestMonth.monthIndex,
              savedInCents: getSavedInCents(stats.bestMonth),
            }}
            topCategory={topCategory}
            averageSavedInCents={stats.averageSavedInCents}
            positiveMonthsCount={stats.positiveMonthsCount}
            closedMonthsCount={stats.closedMonthsCount}
          />
        </Reveal>

        <Reveal className={styles.months}>
          <YearMonthsList year={SAMPLE_YEAR} months={SAMPLE_YEAR_MONTHS} />
        </Reveal>

        <Reveal delay={100} className={styles.categories}>
          <CategorySpending title="Gastos por categoria no ano" items={SAMPLE_YEAR_CATEGORY_SPENDING} />
        </Reveal>
      </div>
    </div>
  )
}
