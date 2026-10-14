import { z } from 'zod'

export const salaryFormSchema = z.object({
  grossSalaryInCents: z.number().int().positive('Informe seu salário bruto'),
})

export type SalaryFormValues = z.infer<typeof salaryFormSchema>
