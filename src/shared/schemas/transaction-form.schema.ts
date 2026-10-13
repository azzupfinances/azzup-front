import { z } from 'zod'

import { PAYMENT_METHODS, type PaymentMethodId } from '@/shared/constants/payment-methods'
import { TRANSACTION_CATEGORIES, type CategoryId } from '@/shared/constants/transaction-categories'

const categoryIds = Object.keys(TRANSACTION_CATEGORIES) as [CategoryId, ...CategoryId[]]
const paymentMethodIds = Object.keys(PAYMENT_METHODS) as [PaymentMethodId, ...PaymentMethodId[]]

export const MAX_INSTALLMENTS_COUNT = 24

export const transactionFormSchema = z
  .object({
    type: z.enum(['expense', 'income']),
    amountInCents: z.number().int().positive('Informe um valor'),
    description: z.string().trim().min(1, 'Informe uma descrição'),
    categoryId: z.enum(categoryIds, 'Escolha uma categoria'),
    date: z.string().min(1, 'Informe a data'),
    // Payment fields only apply to expenses; card and installments only to card expenses.
    paymentMethod: z.enum(paymentMethodIds),
    creditCardId: z.string(),
    installmentsCount: z.number().int().min(1).max(MAX_INSTALLMENTS_COUNT),
  })
  .superRefine((values, context) => {
    if (values.type === 'expense' && values.paymentMethod === 'creditCard' && !values.creditCardId) {
      context.addIssue({ code: 'custom', path: ['creditCardId'], message: 'Escolha um cartão' })
    }
  })

export type TransactionFormValues = z.infer<typeof transactionFormSchema>

export function isCardPurchase(values: TransactionFormValues) {
  return values.type === 'expense' && values.paymentMethod === 'creditCard'
}
