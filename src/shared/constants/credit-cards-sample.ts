import type { CardPurchase, CreditCard } from '@/shared/types/credit-card.types'

// Static example content for the visual phase. Replaced by the credit cards service once
// the backend exists; amounts are integer cents. Card totals are never stored: they are
// calculated from these purchases.
export const SAMPLE_CREDIT_CARDS: CreditCard[] = [
  { id: 'card-nubank', name: 'Nubank', bankId: 'nubank', limitInCents: 800_000, dueDay: 10, paidInvoiceMonths: [] },
  { id: 'card-inter', name: 'Inter', bankId: 'inter', limitInCents: 300_000, dueDay: 5, paidInvoiceMonths: [] },
]

export const SAMPLE_CARD_PURCHASES: CardPurchase[] = [
  {
    id: 'purchase-fridge',
    creditCardId: 'card-nubank',
    description: 'Geladeira Brastemp',
    categoryId: 'housing',
    totalInCents: 359_900,
    installmentsCount: 10,
    purchaseDate: '2026-06-15',
  },
  {
    id: 'purchase-phone',
    creditCardId: 'card-nubank',
    description: 'Celular',
    categoryId: 'other',
    totalInCents: 240_000,
    installmentsCount: 12,
    purchaseDate: '2026-03-20',
  },
  {
    id: 'purchase-flight',
    creditCardId: 'card-nubank',
    description: 'Passagem aérea',
    categoryId: 'leisure',
    totalInCents: 128_000,
    installmentsCount: 4,
    purchaseDate: '2026-09-28',
  },
  {
    id: 'purchase-groceries',
    creditCardId: 'card-nubank',
    description: 'Mercado Extra',
    categoryId: 'food',
    totalInCents: 43_218,
    installmentsCount: 1,
    purchaseDate: '2026-10-08',
  },
  {
    id: 'purchase-course',
    creditCardId: 'card-inter',
    description: 'Curso de Excel',
    categoryId: 'education',
    totalInCents: 100_000,
    installmentsCount: 3,
    purchaseDate: '2026-08-31',
  },
  {
    id: 'purchase-sneakers',
    creditCardId: 'card-inter',
    description: 'Tênis de corrida',
    categoryId: 'health',
    totalInCents: 49_990,
    installmentsCount: 5,
    purchaseDate: '2026-10-02',
  },
  {
    // Fully paid: shows that finished purchases no longer weigh on the card.
    id: 'purchase-headphones',
    creditCardId: 'card-inter',
    description: 'Fone de ouvido',
    categoryId: 'leisure',
    totalInCents: 60_000,
    installmentsCount: 3,
    purchaseDate: '2026-01-10',
  },
]
