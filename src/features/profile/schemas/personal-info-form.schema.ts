import { z } from 'zod'

import { isValidPhone } from '@/features/profile/utils/phone'

export const personalInfoFormSchema = z.object({
  fullName: z
    .string()
    .trim()
    .refine((fullName) => fullName.split(/\s+/).length >= 2, 'Informe seu nome completo'),
  email: z.email('Informe um e-mail válido'),
  phone: z.string().refine(isValidPhone, 'Informe um telefone com DDD'),
})

export type PersonalInfoFormValues = z.infer<typeof personalInfoFormSchema>
