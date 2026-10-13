import { z } from 'zod'

import { TRANSACTION_CATEGORIES, type CategoryId } from '@/shared/constants/transaction-categories'

const categoryIds = Object.keys(TRANSACTION_CATEGORIES) as [CategoryId, ...CategoryId[]]

export const MAX_INSTALLMENTS_COUNT = 24

export const transactionFormSchema = z
  .object({
    type: z.enum(['expense', 'income']),
    amountInCents: z.number().int().positive('Informe um valor'),
    description: z.string().trim().min(1, 'Informe uma descrição'),
    categoryId: z.enum(categoryIds, 'Escolha uma categoria'),
    date: z.string().min(1, 'Informe a data'),
    // `other` covers cash, Pix, debit and boleto. Card fields only apply to card expenses.
    paymentMethod: z.enum(['card', 'other']),
    creditCardId: z.string(),
    installmentsCount: z.number().int().min(1).max(MAX_INSTALLMENTS_COUNT),
  })
  .superRefine((values, context) => {
    if (values.type === 'expense' && values.paymentMethod === 'card' && !values.creditCardId) {
      context.addIssue({ code: 'custom', path: ['creditCardId'], message: 'Escolha um cartão' })
    }
  })

export type TransactionFormValues = z.infer<typeof transactionFormSchema>

export function isCardPurchase(values: TransactionFormValues) {
  return values.type === 'expense' && values.paymentMethod === 'card'
}
