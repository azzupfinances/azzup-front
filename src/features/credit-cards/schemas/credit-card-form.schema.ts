import { z } from 'zod'

export const creditCardFormSchema = z.object({
  name: z.string().trim().min(1, 'Informe o nome do cartão'),
  limitInCents: z.number().int().positive('Informe o limite'),
  dueDay: z
    .number('Informe o dia de vencimento')
    .int('Informe o dia de vencimento')
    .min(1, 'Escolha um dia entre 1 e 31')
    .max(31, 'Escolha um dia entre 1 e 31'),
})

export type CreditCardFormValues = z.infer<typeof creditCardFormSchema>
