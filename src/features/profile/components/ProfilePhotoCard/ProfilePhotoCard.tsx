'use client'

import { Camera, Trash2 } from 'lucide-react'
import { useRef, type ChangeEvent } from 'react'

import { Button } from '@/shared/components/Button/Button'
import { UserAvatar } from '@/shared/components/UserAvatar/UserAvatar'
import { useToast } from '@/shared/hooks/useToast'
import { useUserProfile } from '@/shared/hooks/useUserProfile'

import styles from './ProfilePhotoCard.module.scss'

const ACCEPTED_PHOTO_TYPES = ['image/jpeg', 'image/png', 'image/webp']
const MAX_PHOTO_SIZE_IN_MB = 5

export function ProfilePhotoCard() {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { profile, updateProfile } = useUserProfile()
  const { showToast } = useToast()

  // Pending backend integration: upload through the profile service and keep the returned URL.
  function handlePhotoChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    // Clears the input so picking the same file again still fires a change.
    event.target.value = ''

    if (!file) {
      return
    }

    if (!ACCEPTED_PHOTO_TYPES.includes(file.type)) {
      showToast({ tone: 'error', title: 'Formato não suportado', description: 'Use uma imagem JPG, PNG ou WebP.' })
      return
    }

    if (file.size > MAX_PHOTO_SIZE_IN_MB * 1024 * 1024) {
      showToast({ tone: 'error', title: 'Imagem muito grande', description: `O limite é de ${MAX_PHOTO_SIZE_IN_MB} MB.` })
      return
    }

    const reader = new FileReader()
    reader.onload = () => {
      updateProfile({ photoUrl: String(reader.result) })
      showToast({ tone: 'success', title: 'Foto atualizada' })
    }
    reader.readAsDataURL(file)
  }

  function handleRemovePhoto() {
    updateProfile({ photoUrl: null })
    showToast({ tone: 'info', title: 'Foto removida' })
  }

  return (
    <section className={styles.card} aria-label="Foto de perfil">
      <div className={styles.avatarWrapper}>
        <UserAvatar size="xl" />
        <button
          type="button"
          className={styles.cameraButton}
          aria-label="Trocar foto de perfil"
          onClick={() => fileInputRef.current?.click()}
        >
          <Camera size={16} aria-hidden="true" />
        </button>
      </div>

      <div className={styles.identity}>
        <p className={styles.name}>{profile.fullName}</p>
        <p className={styles.email}>{profile.email}</p>
      </div>

      <div className={styles.actions}>
        <Button variant="outline" size="sm" onClick={() => fileInputRef.current?.click()}>
          <Camera size={16} aria-hidden="true" />
          {profile.photoUrl ? 'Trocar foto' : 'Adicionar foto'}
        </Button>
        {profile.photoUrl && (
          <Button variant="ghost" size="sm" onClick={handleRemovePhoto}>
            <Trash2 size={16} aria-hidden="true" />
            Remover
          </Button>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept={ACCEPTED_PHOTO_TYPES.join(',')}
        className="sr-only"
        tabIndex={-1}
        aria-hidden="true"
        onChange={handlePhotoChange}
      />
    </section>
  )
}
