import { Pencil } from 'lucide-react'

import { CardPurchaseItem } from '@/features/credit-cards/components/CardPurchaseItem/CardPurchaseItem'
import { CreditCardSummaryCard } from '@/shared/components/CreditCardSummaryCard/CreditCardSummaryCard'
import { IconButton } from '@/shared/components/IconButton/IconButton'
import { List } from '@/shared/components/List/List'
import type { CardPurchase, CreditCard } from '@/shared/types/credit-card.types'
import { getActivePurchasesProgress, summarizeCreditCard } from '@/shared/utils/credit-card-summary'

import styles from './CreditCardDetails.module.scss'

type CreditCardDetailsProps = {
  creditCard: CreditCard
  purchases: CardPurchase[]
  todayIsoDate: string
  onEdit: (creditCard: CreditCard) => void
}

// Full breakdown of one card: its summary plus every purchase still being paid.
export function CreditCardDetails({ creditCard, purchases, todayIsoDate, onEdit }: CreditCardDetailsProps) {
  const summary = summarizeCreditCard(creditCard, purchases, todayIsoDate)
  const activePurchases = getActivePurchasesProgress(creditCard.id, purchases, todayIsoDate)

  return (
    <section className={styles.details} aria-label={`Detalhes do cartão ${creditCard.name}`}>
      <CreditCardSummaryCard
        creditCard={creditCard}
        summary={summary}
        actions={
          <IconButton
            icon={Pencil}
            label={`Editar cartão ${creditCard.name}`}
            size="sm"
            variant="outline"
            onClick={() => onEdit(creditCard)}
          />
        }
      />

      <div className={styles.purchases}>
        <h3 className={styles.purchasesTitle}>Compras em andamento</h3>

        {activePurchases.length > 0 ? (
          <List label={`Compras em andamento no ${creditCard.name}`}>
            {activePurchases.map((progress) => (
              <CardPurchaseItem key={progress.purchase.id} progress={progress} />
            ))}
          </List>
        ) : (
          <p className={styles.emptyPurchases}>Nenhuma compra pendente neste cartão.</p>
        )}
      </div>
    </section>
  )
}
