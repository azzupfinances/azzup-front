import { z } from 'zod'

export const MAX_RECEIVABLE_INSTALLMENTS_COUNT = 24

export const receivableFormSchema = z.object({
  description: z.string().trim().min(1, 'Informe a descrição'),
  payerName: z.string().trim().min(1, 'Informe quem vai pagar'),
  totalInCents: z.number().int().positive('Informe o valor total'),
  installmentsCount: z
    .number('Escolha o número de parcelas')
    .int('Escolha o número de parcelas')
    .min(1, 'Escolha o número de parcelas')
    .max(MAX_RECEIVABLE_INSTALLMENTS_COUNT, 'Escolha o número de parcelas'),
  firstDueDate: z.string().min(1, 'Informe a data da primeira parcela'),
})

export type ReceivableFormValues = z.infer<typeof receivableFormSchema>
