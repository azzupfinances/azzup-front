import { Check, RotateCcw, type LucideIcon } from 'lucide-react'
import Link from 'next/link'
import type { ReactNode } from 'react'

import type { BillStatus } from '@/features/bills/types/bill.types'
import { Badge } from '@/shared/components/Badge/Badge'
import { Button } from '@/shared/components/Button/Button'
import { IconButton } from '@/shared/components/IconButton/IconButton'
import { classNames } from '@/shared/utils/class-names'

import styles from './MonthEntryRow.module.scss'

const BADGE_TONES: Record<BillStatus, 'danger' | 'warning' | 'success'> = {
  overdue: 'danger',
  pending: 'warning',
  paid: 'success',
}

type MonthEntryRowProps = {
  icon: LucideIcon
  status: BillStatus
  title: string
  description: string
  amount: ReactNode
  badgeLabel: string
  // The row opens a link or calls `onOpen`.
  href?: string
  onOpen?: () => void
  // Side button: marks the entry done this month ("Pagar", "Recebi") or undoes it.
  doneActionLabel: string
  doneActionAriaLabel: string
  undoActionAriaLabel: string
  onToggleDone: () => void
  // Flashes the row right after it was marked done.
  isHighlighted?: boolean
}

// One entry of the month (bill, invoice or amount to receive) with its quick done button.
export function MonthEntryRow({
  icon: Icon,
  status,
  title,
  description,
  amount,
  badgeLabel,
  href,
  onOpen,
  doneActionLabel,
  doneActionAriaLabel,
  undoActionAriaLabel,
  onToggleDone,
  isHighlighted = false,
}: MonthEntryRowProps) {
  const isDone = status === 'paid'

  const content = (
    <>
      <span className={classNames(styles.icon, styles[status])} aria-hidden="true">
        <Icon size={18} />
      </span>
      <span className={styles.text}>
        <span className={styles.title}>{title}</span>
        <span className={styles.description}>{description}</span>
      </span>
      <span className={classNames(styles.trailing, isDone && styles.isDone)}>
        {amount}
        <Badge tone={BADGE_TONES[status]}>{badgeLabel}</Badge>
      </span>
    </>
  )

  return (
    <li className={classNames(styles.item, isHighlighted && styles.isHighlighted)}>
      {href ? (
        <Link href={href} className={styles.main}>
          {content}
        </Link>
      ) : (
        <button type="button" className={styles.main} onClick={onOpen}>
          {content}
        </button>
      )}

      <div className={styles.action}>
        {isDone ? (
          <IconButton icon={RotateCcw} label={undoActionAriaLabel} size="sm" onClick={onToggleDone} />
        ) : (
          <Button size="sm" variant="outline" aria-label={doneActionAriaLabel} onClick={onToggleDone}>
            <Check size={16} aria-hidden="true" />
            <span className={styles.actionLabel}>{doneActionLabel}</span>
          </Button>
        )}
      </div>
    </li>
  )
}
