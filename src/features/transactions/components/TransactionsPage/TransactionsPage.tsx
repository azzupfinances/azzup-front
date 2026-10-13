import { ImportStatementButton } from '@/features/transactions/components/ImportStatementButton/ImportStatementButton'
import { TransactionsExplorer } from '@/features/transactions/components/TransactionsExplorer/TransactionsExplorer'
import { CreditCardsOverview } from '@/shared/components/CreditCardsOverview/CreditCardsOverview'
import { PageHeader } from '@/shared/components/PageHeader/PageHeader'
import { PeriodSwitcher } from '@/shared/components/PeriodSwitcher/PeriodSwitcher'
import { Reveal } from '@/shared/components/Reveal/Reveal'

import styles from './TransactionsPage.module.scss'

export function TransactionsPage() {
  return (
    <div className={styles.page}>
      <Reveal>
        <PageHeader
          title="Extrato"
          description="Toque numa transação para ver ou editar."
          actions={
            <>
              <PeriodSwitcher />
              <ImportStatementButton />
            </>
          }
        />
      </Reveal>

      <Reveal delay={100}>
        <CreditCardsOverview />
      </Reveal>

      <Reveal delay={200}>
        <TransactionsExplorer />
      </Reveal>
    </div>
  )
}
