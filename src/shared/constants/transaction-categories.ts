import {
  BookOpen,
  Bus,
  Clapperboard,
  HeartPulse,
  House,
  Repeat,
  ShoppingBasket,
  Tag,
  type LucideIcon,
} from 'lucide-react'

// Fixed list for the MVP; custom categories come later.
export type CategoryId =
  | 'housing'
  | 'food'
  | 'transport'
  | 'health'
  | 'leisure'
  | 'education'
  | 'subscriptions'
  | 'other'

export type TransactionCategory = {
  id: CategoryId
  label: string
  icon: LucideIcon
  // CSS custom properties, so every theme can redefine them.
  color: string
  softColor: string
}

export const TRANSACTION_CATEGORIES: Record<CategoryId, TransactionCategory> = {
  housing: {
    id: 'housing',
    label: 'Moradia',
    icon: House,
    color: 'var(--color-category-housing)',
    softColor: 'var(--color-category-housing-soft)',
  },
  food: {
    id: 'food',
    label: 'Alimentação',
    icon: ShoppingBasket,
    color: 'var(--color-category-food)',
    softColor: 'var(--color-category-food-soft)',
  },
  transport: {
    id: 'transport',
    label: 'Transporte',
    icon: Bus,
    color: 'var(--color-category-transport)',
    softColor: 'var(--color-category-transport-soft)',
  },
  health: {
    id: 'health',
    label: 'Saúde',
    icon: HeartPulse,
    color: 'var(--color-category-health)',
    softColor: 'var(--color-category-health-soft)',
  },
  leisure: {
    id: 'leisure',
    label: 'Lazer',
    icon: Clapperboard,
    color: 'var(--color-category-leisure)',
    softColor: 'var(--color-category-leisure-soft)',
  },
  education: {
    id: 'education',
    label: 'Educação',
    icon: BookOpen,
    color: 'var(--color-category-education)',
    softColor: 'var(--color-category-education-soft)',
  },
  subscriptions: {
    id: 'subscriptions',
    label: 'Assinaturas',
    icon: Repeat,
    color: 'var(--color-category-subscriptions)',
    softColor: 'var(--color-category-subscriptions-soft)',
  },
  other: {
    id: 'other',
    label: 'Outros',
    icon: Tag,
    color: 'var(--color-category-other)',
    softColor: 'var(--color-category-other-soft)',
  },
}
