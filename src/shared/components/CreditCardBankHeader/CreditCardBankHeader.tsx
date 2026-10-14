import { CreditCard as CreditCardIcon } from 'lucide-react'
import Image from 'next/image'
import { ViewTransition, type CSSProperties, type ReactNode } from 'react'

import { BANKS } from '@/shared/constants/banks'
import type { CreditCard } from '@/shared/types/credit-card.types'
import { classNames } from '@/shared/utils/class-names'

import styles from './CreditCardBankHeader.module.scss'

type CreditCardBankHeaderProps = {
  creditCard: CreditCard
  actions?: ReactNode
  // `lg` is the banner on top of the card's own screen.
  size?: 'md' | 'lg'
  // Heading level of the card name, so it fits the outline of each screen.
  headingLevel?: 'h1' | 'h3'
  className?: string
}

// Top of a card painted in the bank's color with its logo, like the face of a physical card.
// Every card has its own view transition name, so during navigation the summary header
// morphs into the banner of the card's screen (and back).
export function CreditCardBankHeader({
  creditCard,
  actions,
  size = 'md',
  headingLevel: Heading = 'h3',
  className,
}: CreditCardBankHeaderProps) {
  const bank = BANKS[creditCard.bankId]
  const logoSize = size === 'lg' ? 40 : 28

  return (
    <ViewTransition name={`credit-card-${creditCard.id}`} share="morph" default="none">
      {/* Brand color comes from the card's bank, known only at runtime. */}
      <header
        className={classNames(styles.header, styles[size], className)}
        style={{ '--bank-color': bank.brandColor } as CSSProperties}
      >
        <span className={styles.logo}>
          {bank.logoSrc ? (
            <Image src={bank.logoSrc} alt={bank.name} width={logoSize} height={logoSize} className={styles.logoImage} />
          ) : (
            <CreditCardIcon size={size === 'lg' ? 28 : 20} aria-hidden="true" />
          )}
        </span>
        <div className={styles.text}>
          <Heading className={styles.name}>{creditCard.name}</Heading>
          <p className={styles.dueDay}>Vence todo dia {creditCard.dueDay}</p>
        </div>
        {actions && <div className={styles.actions}>{actions}</div>}
      </header>
    </ViewTransition>
  )
}
