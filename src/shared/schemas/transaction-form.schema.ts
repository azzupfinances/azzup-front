import { z } from 'zod'

import { TRANSACTION_CATEGORIES, type CategoryId } from '@/shared/constants/transaction-categories'

const categoryIds = Object.keys(TRANSACTION_CATEGORIES) as [CategoryId, ...CategoryId[]]

export const transactionFormSchema = z.object({
  type: z.enum(['expense', 'income']),
  amountInCents: z.number().int().positive('Informe um valor'),
  description: z.string().trim().min(1, 'Informe uma descrição'),
  categoryId: z.enum(categoryIds, 'Escolha uma categoria'),
  date: z.string().min(1, 'Informe a data'),
})

export type TransactionFormValues = z.infer<typeof transactionFormSchema>
