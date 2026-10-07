import { z } from 'zod'

import { isValidCpf } from '@/features/auth/utils/cpf'

export const PASSWORD_MIN_LENGTH = 8

export const registerFormSchema = z
  .object({
    name: z
      .string()
      .trim()
      .refine((name) => name.split(/\s+/).length >= 2, 'Informe seu nome completo'),
    cpf: z.string().refine(isValidCpf, 'Informe um CPF válido'),
    email: z.email('Informe um e-mail válido'),
    password: z
      .string()
      .min(PASSWORD_MIN_LENGTH, `A senha deve ter pelo menos ${PASSWORD_MIN_LENGTH} caracteres`),
    passwordConfirmation: z.string().min(1, 'Confirme sua senha'),
    hasAcceptedTerms: z.boolean().refine(Boolean, 'Você precisa aceitar os termos para continuar'),
  })
  .refine((values) => values.password === values.passwordConfirmation, {
    path: ['passwordConfirmation'],
    message: 'As senhas não coincidem',
  })

export type RegisterFormValues = z.infer<typeof registerFormSchema>
