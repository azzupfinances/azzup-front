import { z } from 'zod'

import { PASSWORD_MIN_LENGTH } from '@/shared/constants/password'

export const changePasswordFormSchema = z
  .object({
    currentPassword: z.string().min(1, 'Informe sua senha atual'),
    newPassword: z
      .string()
      .min(PASSWORD_MIN_LENGTH, `A senha deve ter pelo menos ${PASSWORD_MIN_LENGTH} caracteres`),
    newPasswordConfirmation: z.string().min(1, 'Confirme a nova senha'),
  })
  .refine((values) => values.newPassword !== values.currentPassword, {
    path: ['newPassword'],
    message: 'A nova senha deve ser diferente da atual',
  })
  .refine((values) => values.newPassword === values.newPasswordConfirmation, {
    path: ['newPasswordConfirmation'],
    message: 'As senhas não coincidem',
  })

export type ChangePasswordFormValues = z.infer<typeof changePasswordFormSchema>
