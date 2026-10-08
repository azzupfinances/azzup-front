'use client'

import { zodResolver } from '@hookform/resolvers/zod'
// Google sign-in is disabled for now; keep this import with the commented-out button below.
// import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Controller, useForm } from 'react-hook-form'

import { AuthPageHeader } from '@/features/auth/components/AuthPageHeader/AuthPageHeader'
import { CpfField } from '@/features/auth/components/CpfField/CpfField'
import { loginFormSchema, type LoginFormValues } from '@/features/auth/schemas/login-form.schema'
import { Button } from '@/shared/components/Button/Button'
import { PasswordField } from '@/shared/components/PasswordField/PasswordField'
import { FORGOT_PASSWORD_HREF, SYSTEM_HOME_HREF } from '@/shared/constants/routes'

import styles from './LoginForm.module.scss'

export function LoginForm() {
  const router = useRouter()
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    mode: 'onTouched',
    defaultValues: { cpf: '', password: '' },
  })

  // Pending backend integration: authenticate through the auth service and start the session.
  // Until then, any valid form goes straight into the system.
  function handleLogin(_values: LoginFormValues) {
    router.push(SYSTEM_HOME_HREF)
  }

  // Google sign-in is disabled for now. Pending backend integration: start the Google OAuth flow.
  // function handleGoogleSignIn() {}

  return (
    <div className={styles.container}>
      <AuthPageHeader
        title="Boas-vindas à Azzup"
        description="Organize seu salário, controle seus gastos e comece a guardar dinheiro. Simples e sem burocracia."
      />

      <div className={styles.content}>
        {/* Google sign-in is disabled for now.
        <Button variant="outline" size="lg" isFullWidth onClick={handleGoogleSignIn}>
          <Image src="/images/google.svg" alt="" width={18} height={18} />
          Entrar com Google
        </Button>

        <p className={styles.divider}>Ou entre com seu CPF</p>
        */}

        <form className={styles.form} noValidate onSubmit={handleSubmit(handleLogin)}>
          <Controller
            name="cpf"
            control={control}
            render={({ field, fieldState }) => (
              <CpfField
                autoComplete="username"
                error={fieldState.error?.message}
                {...field}
              />
            )}
          />

          <div className={styles.passwordGroup}>
            <PasswordField
              label="Senha"
              autoComplete="current-password"
              placeholder="Digite sua senha"
              error={errors.password?.message}
              {...register('password')}
            />
            <Link href={FORGOT_PASSWORD_HREF} className={styles.forgotPasswordLink}>
              Esqueceu a senha?
            </Link>
          </div>

          <Button type="submit" size="lg" isFullWidth disabled={isSubmitting}>
            {isSubmitting ? 'Entrando...' : 'Entrar'}
          </Button>
        </form>

        <p className={styles.terms}>
          Ao entrar, você concorda com nossos <span>termos e condições</span>.
        </p>
      </div>
    </div>
  )
}
