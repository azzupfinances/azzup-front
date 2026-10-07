'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'

import { AuthPageHeader } from '@/features/auth/components/AuthPageHeader/AuthPageHeader'
import { CpfField } from '@/features/auth/components/CpfField/CpfField'
import {
  PASSWORD_MIN_LENGTH,
  registerFormSchema,
  type RegisterFormValues,
} from '@/features/auth/schemas/register-form.schema'
import { Button } from '@/shared/components/Button/Button'
import { Checkbox } from '@/shared/components/Checkbox/Checkbox'
import { PasswordField } from '@/shared/components/PasswordField/PasswordField'
import { TextField } from '@/shared/components/TextField/TextField'

import styles from './RegisterForm.module.scss'

export function RegisterForm() {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerFormSchema),
    mode: 'onTouched',
    defaultValues: {
      name: '',
      cpf: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      hasAcceptedTerms: false,
    },
  })

  // Pending backend integration: create the account through the auth service and start the session.
  function handleRegister(_values: RegisterFormValues) {}

  return (
    <div className={styles.container}>
      <AuthPageHeader
        title="Crie sua conta"
        description="Em poucos minutos você começa a organizar seu salário e acompanhar seus gastos."
      />

      <form className={styles.form} noValidate onSubmit={handleSubmit(handleRegister)}>
        <TextField
          label="Nome completo"
          autoComplete="name"
          placeholder="Como está no seu documento"
          error={errors.name?.message}
          {...register('name')}
        />

        <Controller
          name="cpf"
          control={control}
          render={({ field, fieldState }) => (
            <CpfField autoComplete="off" error={fieldState.error?.message} {...field} />
          )}
        />

        <TextField
          label="E-mail"
          type="email"
          autoComplete="email"
          placeholder="voce@exemplo.com"
          hint="Usado para recuperar sua senha."
          error={errors.email?.message}
          {...register('email')}
        />

        <PasswordField
          label="Senha"
          autoComplete="new-password"
          placeholder="Crie uma senha"
          hint={`Mínimo de ${PASSWORD_MIN_LENGTH} caracteres.`}
          error={errors.password?.message}
          {...register('password')}
        />

        <PasswordField
          label="Confirmar senha"
          autoComplete="new-password"
          placeholder="Repita a senha"
          error={errors.passwordConfirmation?.message}
          {...register('passwordConfirmation')}
        />

        <Checkbox error={errors.hasAcceptedTerms?.message} {...register('hasAcceptedTerms')}>
          Li e aceito os <span className={styles.terms}>termos e condições</span>.
        </Checkbox>

        <Button type="submit" size="lg" isFullWidth disabled={isSubmitting}>
          {isSubmitting ? 'Criando conta...' : 'Criar conta'}
        </Button>
      </form>
    </div>
  )
}
