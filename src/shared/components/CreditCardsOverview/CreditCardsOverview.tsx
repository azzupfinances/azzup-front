'use client'

import { CreditCard } from 'lucide-react'
import Link from 'next/link'
import { useId } from 'react'

import { Button } from '@/shared/components/Button/Button'
import { CreditCardSummaryCard } from '@/shared/components/CreditCardSummaryCard/CreditCardSummaryCard'
import { EmptyState } from '@/shared/components/EmptyState/EmptyState'
import { Skeleton } from '@/shared/components/Skeleton/Skeleton'
import { CREDIT_CARDS_HREF } from '@/shared/constants/routes'
import { useCreditCards } from '@/shared/hooks/useCreditCards'
import { useTodayIsoDate } from '@/shared/hooks/useTodayIsoDate'
import { summarizeCreditCard } from '@/shared/utils/credit-card-summary'

import styles from './CreditCardsOverview.module.scss'

// One summary card per credit card (never a single total), shown on Início.
export function CreditCardsOverview() {
  const { creditCards, purchases } = useCreditCards()
  const todayIsoDate = useTodayIsoDate()
  const titleId = useId()

  return (
    <section className={styles.overview} aria-labelledby={titleId}>
      <header className={styles.header}>
        <h2 id={titleId} className={styles.title}>
          Cartões de crédito
        </h2>
        {creditCards.length > 0 && (
          <Link href={CREDIT_CARDS_HREF} className={styles.action}>
            Ver detalhes
          </Link>
        )}
      </header>

      {creditCards.length === 0 ? (
        <EmptyState
          icon={CreditCard}
          title="Nenhum cartão cadastrado"
          description="Cadastre seus cartões para ver limite, parcelas e quanto pesa em cada mês."
          action={
            <Button href={CREDIT_CARDS_HREF} variant="outline">
              Cadastrar cartão
            </Button>
          }
        />
      ) : (
        <div className={styles.grid} aria-busy={todayIsoDate === null || undefined}>
          {creditCards.map((creditCard) =>
            // Totals depend on the current month, known only in the browser.
            todayIsoDate ? (
              <CreditCardSummaryCard
                key={creditCard.id}
                creditCard={creditCard}
                summary={summarizeCreditCard(creditCard, purchases, todayIsoDate)}
                isCompactOnPhone
              />
            ) : (
              <Skeleton key={creditCard.id} shape="block" height="236px" />
            ),
          )}
        </div>
      )}
    </section>
  )
}
