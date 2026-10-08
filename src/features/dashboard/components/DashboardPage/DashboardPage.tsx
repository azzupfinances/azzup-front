import { CalendarRange } from 'lucide-react'

import { BalanceCard } from '@/features/dashboard/components/BalanceCard/BalanceCard'
import { CategorySpending } from '@/features/dashboard/components/CategorySpending/CategorySpending'
import { PaydayCard } from '@/features/dashboard/components/PaydayCard/PaydayCard'
import { RecentTransactions } from '@/features/dashboard/components/RecentTransactions/RecentTransactions'
import { UpcomingBills } from '@/features/dashboard/components/UpcomingBills/UpcomingBills'
import { SAMPLE_CATEGORY_SPENDING, SAMPLE_USER_FIRST_NAME } from '@/features/dashboard/constants/dashboard-sample'
import { Button } from '@/shared/components/Button/Button'
import { HighlightText } from '@/shared/components/HighlightText/HighlightText'
import { PageHeader } from '@/shared/components/PageHeader/PageHeader'
import { PeriodSwitcher } from '@/shared/components/PeriodSwitcher/PeriodSwitcher'
import { Reveal } from '@/shared/components/Reveal/Reveal'
import { TRANSACTIONS_HREF, YEAR_OVERVIEW_HREF } from '@/shared/constants/routes'

import styles from './DashboardPage.module.scss'

// Same motion language as the landing page: blocks rise in as they enter the viewport
// (staggered when they appear together) and the user's name carries the light sheen.
export function DashboardPage() {
  return (
    <div className={styles.page}>
      <Reveal>
        <PageHeader
          title={
            <>
              Olá, <HighlightText className={styles.name}>{SAMPLE_USER_FIRST_NAME}</HighlightText>
            </>
          }
          description="Veja como está o seu mês."
          actions={
            <>
              <PeriodSwitcher />
              <Button href={YEAR_OVERVIEW_HREF} variant="outline">
                <CalendarRange size={18} aria-hidden="true" />
                Ver ano
              </Button>
            </>
          }
        />
      </Reveal>

      <div className={styles.grid}>
        <Reveal delay={100} className={styles.balance}>
          <BalanceCard />
        </Reveal>
        <Reveal delay={200} className={styles.payday}>
          <PaydayCard />
        </Reveal>
        <Reveal delay={300} className={styles.transactions}>
          <RecentTransactions />
        </Reveal>
        <Reveal delay={400} className={styles.bills}>
          <UpcomingBills />
        </Reveal>
        <Reveal delay={500} className={styles.categories}>
          <CategorySpending
            title="Gastos por categoria"
            items={SAMPLE_CATEGORY_SPENDING}
            action={{ label: 'Detalhes', href: TRANSACTIONS_HREF }}
          />
        </Reveal>
      </div>
    </div>
  )
}
