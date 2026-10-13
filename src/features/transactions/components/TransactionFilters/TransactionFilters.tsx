'use client'

import {
  CreditCard as CreditCardIcon,
  LayoutGrid,
  Search,
  SlidersHorizontal,
  Wallet,
  X,
  type LucideIcon,
} from 'lucide-react'
import { useState } from 'react'

import {
  FilterChoiceSheet,
  type FilterChoice,
} from '@/features/transactions/components/FilterChoiceSheet/FilterChoiceSheet'
import type {
  PaymentFilter,
  TransactionTypeFilter,
  TransactionsFilters,
} from '@/features/transactions/types/transaction.types'
import { IconButton } from '@/shared/components/IconButton/IconButton'
import { SegmentedControl } from '@/shared/components/SegmentedControl/SegmentedControl'
import { TextField } from '@/shared/components/TextField/TextField'
import { PAYMENT_METHODS, type PaymentMethodId } from '@/shared/constants/payment-methods'
import { TRANSACTION_CATEGORIES, type CategoryId } from '@/shared/constants/transaction-categories'
import type { CreditCard } from '@/shared/types/credit-card.types'

import styles from './TransactionFilters.module.scss'

const TYPE_OPTIONS: { value: TransactionTypeFilter; label: string }[] = [
  { value: 'all', label: 'Todas' },
  { value: 'expense', label: 'Saídas' },
  { value: 'income', label: 'Entradas' },
]

const ALL_CHOICE: FilterChoice = { value: 'all', label: 'Todas', icon: LayoutGrid }

const CATEGORY_CHOICES: FilterChoice[] = [
  ALL_CHOICE,
  ...Object.values(TRANSACTION_CATEGORIES).map((category) => ({
    value: category.id,
    label: category.label,
    icon: category.icon,
  })),
]

// Card purchases are filtered per card, so the generic credit card method is not a choice.
const NON_CARD_PAYMENT_METHODS = Object.values(PAYMENT_METHODS).filter((method) => method.id !== 'creditCard')

// The sheet works with plain strings: "all", "method:<id>" or "card:<id>".
function toPaymentChoiceValue(payment: PaymentFilter) {
  if (payment.kind === 'method') {
    return `method:${payment.paymentMethodId}`
  }

  return payment.kind === 'card' ? `card:${payment.creditCardId}` : 'all'
}

function toPaymentFilter(value: string): PaymentFilter {
  const [kind, id] = value.split(':')

  if (kind === 'method') {
    return { kind: 'method', paymentMethodId: id as PaymentMethodId }
  }

  return kind === 'card' ? { kind: 'card', creditCardId: id } : { kind: 'all' }
}

function getPaymentChoices(creditCards: CreditCard[]): FilterChoice[] {
  return [
    ALL_CHOICE,
    ...NON_CARD_PAYMENT_METHODS.map((method) => ({
      value: toPaymentChoiceValue({ kind: 'method', paymentMethodId: method.id }),
      label: method.label,
      icon: method.icon,
    })),
    ...creditCards.map((creditCard) => ({
      value: toPaymentChoiceValue({ kind: 'card', creditCardId: creditCard.id }),
      label: creditCard.name,
      icon: CreditCardIcon,
    })),
  ]
}

type OpenSheet = 'category' | 'payment' | null

type TransactionFiltersProps = {
  filters: TransactionsFilters
  creditCards: CreditCard[]
  onFiltersChange: (filters: TransactionsFilters) => void
}

// Only search and the type switch are always visible; category and payment method live
// behind buttons and show up as removable chips once chosen.
export function TransactionFilters({ filters, creditCards, onFiltersChange }: TransactionFiltersProps) {
  const [openSheet, setOpenSheet] = useState<OpenSheet>(null)
  const paymentChoices = getPaymentChoices(creditCards)
  const paymentChoiceValue = toPaymentChoiceValue(filters.payment)
  const selectedCategory = filters.categoryId === 'all' ? null : TRANSACTION_CATEGORIES[filters.categoryId]
  const selectedPayment =
    paymentChoiceValue === 'all' ? null : paymentChoices.find((choice) => choice.value === paymentChoiceValue)

  return (
    <div className={styles.filters} role="search">
      <div className={styles.searchRow}>
        <TextField
          label="Buscar transação"
          isLabelHidden
          type="search"
          placeholder="Buscar transação"
          startAdornment={<Search size={18} aria-hidden="true" />}
          value={filters.search}
          onChange={(event) => onFiltersChange({ ...filters, search: event.target.value })}
          className={styles.search}
        />
        <FilterButton
          icon={Wallet}
          label="Filtrar por forma de pagamento"
          isActive={Boolean(selectedPayment)}
          onClick={() => setOpenSheet('payment')}
        />
        <FilterButton
          icon={SlidersHorizontal}
          label="Filtrar por categoria"
          isActive={Boolean(selectedCategory)}
          onClick={() => setOpenSheet('category')}
        />
      </div>

      <div className={styles.chipsRow}>
        <SegmentedControl
          label="Filtrar por tipo"
          options={TYPE_OPTIONS}
          value={filters.type}
          onValueChange={(type) => onFiltersChange({ ...filters, type })}
        />

        {selectedPayment && (
          <ActiveFilterChip
            icon={selectedPayment.icon}
            label={selectedPayment.label}
            onRemove={() => onFiltersChange({ ...filters, payment: { kind: 'all' } })}
          />
        )}

        {selectedCategory && (
          <ActiveFilterChip
            icon={selectedCategory.icon}
            label={selectedCategory.label}
            onRemove={() => onFiltersChange({ ...filters, categoryId: 'all' })}
          />
        )}
      </div>

      <FilterChoiceSheet
        isOpen={openSheet === 'payment'}
        title="Filtrar por forma de pagamento"
        choices={paymentChoices}
        selectedValue={paymentChoiceValue}
        onSelect={(value) => {
          onFiltersChange({ ...filters, payment: toPaymentFilter(value) })
          setOpenSheet(null)
        }}
        onClose={() => setOpenSheet(null)}
      />

      <FilterChoiceSheet
        isOpen={openSheet === 'category'}
        title="Filtrar por categoria"
        choices={CATEGORY_CHOICES}
        selectedValue={filters.categoryId}
        onSelect={(value) => {
          onFiltersChange({ ...filters, categoryId: value as CategoryId | 'all' })
          setOpenSheet(null)
        }}
        onClose={() => setOpenSheet(null)}
      />
    </div>
  )
}

type FilterButtonProps = {
  icon: LucideIcon
  label: string
  isActive: boolean
  onClick: () => void
}

function FilterButton({ icon, label, isActive, onClick }: FilterButtonProps) {
  return (
    <span className={styles.filterButton}>
      <IconButton icon={icon} label={label} variant="outline" onClick={onClick} />
      {isActive && <span className={styles.activeDot} aria-hidden="true" />}
    </span>
  )
}

type ActiveFilterChipProps = {
  icon: LucideIcon
  label: string
  onRemove: () => void
}

function ActiveFilterChip({ icon: Icon, label, onRemove }: ActiveFilterChipProps) {
  return (
    <button type="button" className={styles.activeChip} aria-label={`Remover filtro ${label}`} onClick={onRemove}>
      <Icon size={16} aria-hidden="true" />
      {label}
      <X size={14} aria-hidden="true" />
    </button>
  )
}
