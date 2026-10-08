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
}

export const TRANSACTION_CATEGORIES: Record<CategoryId, TransactionCategory> = {
  housing: { id: 'housing', label: 'Moradia', icon: House },
  food: { id: 'food', label: 'Alimentação', icon: ShoppingBasket },
  transport: { id: 'transport', label: 'Transporte', icon: Bus },
  health: { id: 'health', label: 'Saúde', icon: HeartPulse },
  leisure: { id: 'leisure', label: 'Lazer', icon: Clapperboard },
  education: { id: 'education', label: 'Educação', icon: BookOpen },
  subscriptions: { id: 'subscriptions', label: 'Assinaturas', icon: Repeat },
  other: { id: 'other', label: 'Outros', icon: Tag },
}
