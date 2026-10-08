'use client'

import { Search, SlidersHorizontal, X } from 'lucide-react'
import { useState } from 'react'

import { CategoryFilterSheet } from '@/features/transactions/components/CategoryFilterSheet/CategoryFilterSheet'
import type {
  TransactionTypeFilter,
  TransactionsFilters,
} from '@/features/transactions/types/transaction.types'
import { IconButton } from '@/shared/components/IconButton/IconButton'
import { SegmentedControl } from '@/shared/components/SegmentedControl/SegmentedControl'
import { TextField } from '@/shared/components/TextField/TextField'
import { TRANSACTION_CATEGORIES } from '@/shared/constants/transaction-categories'

import styles from './TransactionFilters.module.scss'

const TYPE_OPTIONS: { value: TransactionTypeFilter; label: string }[] = [
  { value: 'all', label: 'Todas' },
  { value: 'expense', label: 'Saídas' },
  { value: 'income', label: 'Entradas' },
]

type TransactionFiltersProps = {
  filters: TransactionsFilters
  onFiltersChange: (filters: TransactionsFilters) => void
}

// Only search and the type switch are always visible; the category lives behind a button
// and shows up as a removable chip once chosen.
export function TransactionFilters({ filters, onFiltersChange }: TransactionFiltersProps) {
  const [isCategorySheetOpen, setIsCategorySheetOpen] = useState(false)
  const selectedCategory = filters.categoryId === 'all' ? null : TRANSACTION_CATEGORIES[filters.categoryId]

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
        <span className={styles.filterButton}>
          <IconButton
            icon={SlidersHorizontal}
            label="Filtrar por categoria"
            variant="outline"
            onClick={() => setIsCategorySheetOpen(true)}
          />
          {selectedCategory && <span className={styles.activeDot} aria-hidden="true" />}
        </span>
      </div>

      <div className={styles.chipsRow}>
        <SegmentedControl
          label="Filtrar por tipo"
          options={TYPE_OPTIONS}
          value={filters.type}
          onValueChange={(type) => onFiltersChange({ ...filters, type })}
        />

        {selectedCategory && (
          <button
            type="button"
            className={styles.activeChip}
            aria-label={`Remover filtro ${selectedCategory.label}`}
            onClick={() => onFiltersChange({ ...filters, categoryId: 'all' })}
          >
            <selectedCategory.icon size={16} aria-hidden="true" />
            {selectedCategory.label}
            <X size={14} aria-hidden="true" />
          </button>
        )}
      </div>

      <CategoryFilterSheet
        isOpen={isCategorySheetOpen}
        selectedCategoryId={filters.categoryId}
        onSelect={(categoryId) => {
          onFiltersChange({ ...filters, categoryId })
          setIsCategorySheetOpen(false)
        }}
        onClose={() => setIsCategorySheetOpen(false)}
      />
    </div>
  )
}
