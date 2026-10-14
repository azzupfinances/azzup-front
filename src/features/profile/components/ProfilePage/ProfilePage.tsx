import { ChangePasswordForm } from '@/features/profile/components/ChangePasswordForm/ChangePasswordForm'
import { PersonalInfoForm } from '@/features/profile/components/PersonalInfoForm/PersonalInfoForm'
import { ProfilePhotoCard } from '@/features/profile/components/ProfilePhotoCard/ProfilePhotoCard'
import { SalaryForm } from '@/features/profile/components/SalaryForm/SalaryForm'
import { PageHeader } from '@/shared/components/PageHeader/PageHeader'
import { Reveal } from '@/shared/components/Reveal/Reveal'

import styles from './ProfilePage.module.scss'

export function ProfilePage() {
  return (
    <div className={styles.page}>
      <Reveal>
        <PageHeader title="Perfil" description="Seus dados, seu salário e sua senha de acesso." />
      </Reveal>

      <Reveal delay={100}>
        <ProfilePhotoCard />
      </Reveal>

      <Reveal delay={150}>
        <PersonalInfoForm />
      </Reveal>

      <Reveal delay={200}>
        <SalaryForm />
      </Reveal>

      <Reveal delay={250}>
        <ChangePasswordForm />
      </Reveal>
    </div>
  )
}
