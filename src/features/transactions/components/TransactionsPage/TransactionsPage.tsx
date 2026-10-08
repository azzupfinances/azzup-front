import { ImportStatementButton } from '@/features/transactions/components/ImportStatementButton/ImportStatementButton'
import { TransactionsExplorer } from '@/features/transactions/components/TransactionsExplorer/TransactionsExplorer'
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
        <TransactionsExplorer />
      </Reveal>
    </div>
  )
}
