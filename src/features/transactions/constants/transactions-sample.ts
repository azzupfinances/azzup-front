import type { Transaction, TransactionsFilters } from '@/features/transactions/types/transaction.types'

export const DEFAULT_TRANSACTIONS_FILTERS: TransactionsFilters = {
  search: '',
  type: 'all',
  categoryId: 'all',
}

// Static example content for the visual phase. Replaced by the transactions service once
// the backend exists; amounts are integer cents.
export const SAMPLE_TRANSACTIONS: Transaction[] = [
  { id: 't01', description: 'Mercado Extra', amountInCents: -18_432, date: '2026-10-07', categoryId: 'food', source: 'manual' },
  { id: 't02', description: 'Padaria Pão Quente', amountInCents: -1_850, date: '2026-10-07', categoryId: 'food', source: 'manual' },
  { id: 't03', description: 'Uber', amountInCents: -2_390, date: '2026-10-06', categoryId: 'transport', source: 'import' },
  { id: 't04', description: 'iFood', amountInCents: -6_750, date: '2026-10-06', categoryId: 'food', source: 'import' },
  { id: 't05', description: 'Pix recebido — Lucas', amountInCents: 15_000, date: '2026-10-06', categoryId: 'other', source: 'import' },
  { id: 't06', description: 'Farmácia São João', amountInCents: -4_780, date: '2026-10-06', categoryId: 'health', source: 'manual' },
  { id: 't07', description: 'Cinema', amountInCents: -6_400, date: '2026-10-05', categoryId: 'leisure', source: 'manual' },
  { id: 't08', description: 'Salário', amountInCents: 485_000, date: '2026-10-05', categoryId: 'other', source: 'import' },
  { id: 't09', description: 'Aluguel', amountInCents: -120_000, date: '2026-10-05', categoryId: 'housing', source: 'manual' },
  { id: 't10', description: 'Netflix', amountInCents: -5_590, date: '2026-10-04', categoryId: 'subscriptions', source: 'import' },
  { id: 't11', description: 'Posto Shell', amountInCents: -15_000, date: '2026-10-04', categoryId: 'transport', source: 'import' },
  { id: 't12', description: 'Curso de inglês', amountInCents: -18_900, date: '2026-10-03', categoryId: 'education', source: 'manual' },
  { id: 't13', description: 'Conta de água', amountInCents: -8_730, date: '2026-10-03', categoryId: 'housing', source: 'manual' },
  { id: 't14', description: 'Spotify', amountInCents: -2_190, date: '2026-10-02', categoryId: 'subscriptions', source: 'import' },
  { id: 't15', description: 'Restaurante Sabor Caseiro', amountInCents: -4_200, date: '2026-10-02', categoryId: 'food', source: 'manual' },
  { id: 't16', description: 'Venda no Enjoei', amountInCents: 8_500, date: '2026-10-01', categoryId: 'other', source: 'manual' },
  { id: 't17', description: 'Bilhete único', amountInCents: -5_000, date: '2026-10-01', categoryId: 'transport', source: 'manual' },
  { id: 't18', description: 'Academia', amountInCents: -8_990, date: '2026-10-01', categoryId: 'health', source: 'import' },
]
