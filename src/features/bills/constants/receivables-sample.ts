import type { Receivable } from '@/features/bills/types/receivable.types'

// Static example content for the visual phase, matching the sample month (October 2026).
// Replaced by the receivables service once the backend exists.
export const SAMPLE_RECEIVABLES: Receivable[] = [
  {
    id: 'loan-pedro',
    description: 'Empréstimo',
    payerName: 'Pedro',
    totalInCents: 100_000,
    installmentsCount: 10,
    firstDueDate: '2026-06-15',
    receivedMonths: ['2026-06', '2026-07', '2026-08', '2026-09'],
  },
  {
    id: 'bike-lucas',
    description: 'Venda da bicicleta',
    payerName: 'Lucas',
    totalInCents: 60_000,
    installmentsCount: 3,
    firstDueDate: '2026-09-05',
    receivedMonths: ['2026-09'],
  },
  {
    id: 'concert-ana',
    description: 'Ingresso do show',
    payerName: 'Ana',
    totalInCents: 36_000,
    installmentsCount: 2,
    firstDueDate: '2026-10-01',
    receivedMonths: ['2026-10'],
  },
]
