'use client'

import { LayoutGrid } from 'lucide-react'

import { Modal } from '@/shared/components/Modal/Modal'
import { TRANSACTION_CATEGORIES, type CategoryId } from '@/shared/constants/transaction-categories'
import { classNames } from '@/shared/utils/class-names'

import styles from './CategoryFilterSheet.module.scss'

const CATEGORY_CHOICES = [
  { value: 'all' as const, label: 'Todas', icon: LayoutGrid },
  ...Object.values(TRANSACTION_CATEGORIES).map((category) => ({
    value: category.id,
    label: category.label,
    icon: category.icon,
  })),
]

type CategoryFilterSheetProps = {
  isOpen: boolean
  selectedCategoryId: CategoryId | 'all'
  onSelect: (categoryId: CategoryId | 'all') => void
  onClose: () => void
}

// Picking a category applies it right away, so there is no extra "apply" step.
export function CategoryFilterSheet({ isOpen, selectedCategoryId, onSelect, onClose }: CategoryFilterSheetProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Filtrar por categoria">
      <ul className={styles.grid}>
        {CATEGORY_CHOICES.map((choice) => {
          const isSelected = choice.value === selectedCategoryId

          return (
            <li key={choice.value}>
              <button
                type="button"
                className={classNames(styles.choice, isSelected && styles.isSelected)}
                aria-pressed={isSelected}
                onClick={() => onSelect(choice.value)}
              >
                <choice.icon size={20} aria-hidden="true" />
                {choice.label}
              </button>
            </li>
          )
        })}
      </ul>
    </Modal>
  )
}
