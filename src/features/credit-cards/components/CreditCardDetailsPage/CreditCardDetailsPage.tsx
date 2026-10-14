'use client'

import { ArrowLeft, CreditCard as CreditCardIcon, ReceiptText } from 'lucide-react'

import { getMonthInvoiceEntries } from '@/features/credit-cards/utils/month-invoice'
import { AnimatedMoney } from '@/shared/components/AnimatedMoney/AnimatedMoney'
import { Button } from '@/shared/components/Button/Button'
import { CreditCardBankHeader } from '@/shared/components/CreditCardBankHeader/CreditCardBankHeader'
import { EmptyState } from '@/shared/components/EmptyState/EmptyState'
import { List } from '@/shared/components/List/List'
import { ListItem } from '@/shared/components/ListItem/ListItem'
import { Money } from '@/shared/components/Money/Money'
import { Reveal } from '@/shared/components/Reveal/Reveal'
import { Skeleton } from '@/shared/components/Skeleton/Skeleton'
import { CREDIT_CARDS_HREF } from '@/shared/constants/routes'
import { TRANSACTION_CATEGORIES } from '@/shared/constants/transaction-categories'
import { useCreditCards } from '@/shared/hooks/useCreditCards'
import { useTodayIsoDate } from '@/shared/hooks/useTodayIsoDate'
import { parseIsoDate } from '@/shared/utils/iso-date'

import styles from './CreditCardDetailsPage.module.scss'

const monthFormatter = new Intl.DateTimeFormat('pt-BR', { month: 'long' })

type CreditCardDetailsPageProps = {
  creditCardId: string
}

// Cards live in the in-memory provider, so the screen reads them in the browser.
export function CreditCardDetailsPage({ creditCardId }: CreditCardDetailsPageProps) {
  const { creditCards, purchases } = useCreditCards()
  const todayIsoDate = useTodayIsoDate()
  const creditCard = creditCards.find((card) => card.id === creditCardId)

  const backLink = (
    <Button href={CREDIT_CARDS_HREF} variant="ghost" size="sm" className={styles.backLink}>
      <ArrowLeft size={16} aria-hidden="true" />
      Cartões
    </Button>
  )

  if (!creditCard) {
    return (
      <div className={styles.page}>
        {backLink}
        <EmptyState
          icon={CreditCardIcon}
          title="Cartão não encontrado"
          description="Ele pode ter sido removido. Volte para a lista de cartões."
        />
      </div>
    )
  }

  function renderInvoice() {
    // The month comes from today's date, known only in the browser.
    if (!todayIsoDate) {
      return <Skeleton shape="block" height="240px" />
    }

    const entries = getMonthInvoiceEntries(creditCardId, purchases, todayIsoDate)
    const totalInCents = entries.reduce((total, { installment }) => total + installment.amountInCents, 0)
    const monthName = monthFormatter.format(parseIsoDate(todayIsoDate))

    return (
      <section className={styles.invoice} aria-label={`Fatura de ${monthName}`}>
        <header className={styles.invoiceHeader}>
          <div>
            <h2 className={styles.invoiceTitle}>Fatura de {monthName}</h2>
            <p className={styles.invoiceCount}>{entries.length === 1 ? '1 compra' : `${entries.length} compras`}</p>
          </div>
          <AnimatedMoney amountInCents={totalInCents} size="lg" />
        </header>

        {entries.length > 0 ? (
          <List label={`Compras na fatura de ${monthName}`}>
            {entries.map(({ purchase, installment }) => {
              const category = TRANSACTION_CATEGORIES[purchase.categoryId]
              const installmentLabel =
                purchase.installmentsCount > 1
                  ? `Parcela ${installment.number} de ${purchase.installmentsCount}`
                  : 'À vista'

              return (
                <ListItem
                  key={`${purchase.id}-${installment.number}`}
                  icon={category.icon}
                  iconColor={category}
                  title={purchase.description}
                  description={`${category.label} · ${installmentLabel}`}
                  trailing={<Money amountInCents={installment.amountInCents} size="sm" />}
                />
              )
            })}
          </List>
        ) : (
          <EmptyState
            icon={ReceiptText}
            title="Fatura vazia"
            description="Nenhuma compra deste cartão cai neste mês."
          />
        )}
      </section>
    )
  }

  return (
    <div className={styles.page}>
      <Reveal>
        {backLink}
        <CreditCardBankHeader creditCard={creditCard} size="lg" headingLevel="h1" />
      </Reveal>

      <Reveal delay={100}>{renderInvoice()}</Reveal>
    </div>
  )
}
