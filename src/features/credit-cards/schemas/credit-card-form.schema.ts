import { z } from 'zod'

import { BANK_IDS } from '@/shared/constants/banks'

export const creditCardFormSchema = z.object({
  bankId: z.enum(BANK_IDS, 'Escolha o banco'),
  name: z.string().trim().min(1, 'Informe o nome do cartão'),
  limitInCents: z.number().int().positive('Informe o limite'),
  dueDay: z
    .number('Informe o dia de vencimento')
    .int('Informe o dia de vencimento')
    .min(1, 'Escolha um dia entre 1 e 31')
    .max(31, 'Escolha um dia entre 1 e 31'),
})

export type CreditCardFormValues = z.infer<typeof creditCardFormSchema>
