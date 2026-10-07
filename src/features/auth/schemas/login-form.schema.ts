import { z } from 'zod'

import { isValidCpf } from '@/features/auth/utils/cpf'

export const loginFormSchema = z.object({
  cpf: z.string().refine(isValidCpf, 'Informe um CPF válido'),
  password: z.string().min(1, 'Informe sua senha'),
})

export type LoginFormValues = z.infer<typeof loginFormSchema>
