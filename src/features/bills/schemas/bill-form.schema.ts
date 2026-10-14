import { z } from 'zod'

import { TRANSACTION_CATEGORIES, type CategoryId } from '@/shared/constants/transaction-categories'

const CATEGORY_IDS = Object.keys(TRANSACTION_CATEGORIES) as [CategoryId, ...CategoryId[]]

export const billFormSchema = z.object({
  name: z.string().trim().min(1, 'Informe o nome da conta'),
  amountInCents: z.number().int().positive('Informe o valor'),
  categoryId: z.enum(CATEGORY_IDS, 'Escolha uma categoria'),
  dueDay: z
    .number('Informe o dia de vencimento')
    .int('Informe o dia de vencimento')
    .min(1, 'Escolha um dia entre 1 e 31')
    .max(31, 'Escolha um dia entre 1 e 31'),
})

export type BillFormValues = z.infer<typeof billFormSchema>
