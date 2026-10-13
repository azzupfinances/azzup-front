'use client'

import type { LucideIcon } from 'lucide-react'

import { Modal } from '@/shared/components/Modal/Modal'
import { classNames } from '@/shared/utils/class-names'

import styles from './FilterChoiceSheet.module.scss'

export type FilterChoice = {
  value: string
  label: string
  icon: LucideIcon
}

type FilterChoiceSheetProps = {
  isOpen: boolean
  title: string
  choices: FilterChoice[]
  selectedValue: string
  onSelect: (value: string) => void
  onClose: () => void
}

// Grid of single-choice filter options (category, payment method). Picking one applies it
// right away, so there is no extra "apply" step.
export function FilterChoiceSheet({ isOpen, title, choices, selectedValue, onSelect, onClose }: FilterChoiceSheetProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <ul className={styles.grid}>
        {choices.map((choice) => {
          const isSelected = choice.value === selectedValue

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
