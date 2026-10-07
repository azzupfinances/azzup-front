'use client'

import { X } from 'lucide-react'
import { useEffect, useId, useRef, type ReactNode } from 'react'

import { IconButton } from '@/shared/components/IconButton/IconButton'
import { classNames } from '@/shared/utils/class-names'

import styles from './Modal.module.scss'

type ModalProps = {
  isOpen: boolean
  onClose: () => void
  title: string
  description?: string
  footer?: ReactNode
  children?: ReactNode
}

// Bottom sheet on phones, centered dialog from `md` up. Built on the native <dialog>,
// which provides focus trapping, Esc to close and top-layer rendering.
export function Modal({ isOpen, onClose, title, description, footer, children }: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const titleId = useId()
  const descriptionId = useId()

  useEffect(() => {
    const dialog = dialogRef.current

    if (!dialog) {
      return
    }

    if (isOpen && !dialog.open) {
      dialog.showModal()
    } else if (!isOpen && dialog.open) {
      dialog.close()
    }
  }, [isOpen])

  return (
    <dialog
      ref={dialogRef}
      className={styles.modal}
      aria-labelledby={titleId}
      aria-describedby={description ? descriptionId : undefined}
      onClose={onClose}
      // The dialog element itself is only hit outside the panel, i.e. on the backdrop.
      onClick={(event) => event.target === event.currentTarget && onClose()}
    >
      <div className={styles.panel}>
        <span className={styles.handle} aria-hidden="true" />

        <header className={classNames(styles.header, !children && styles.headerOnly)}>
          <div className={styles.headerText}>
            <h2 id={titleId} className={styles.title}>
              {title}
            </h2>
            {description && (
              <p id={descriptionId} className={styles.description}>
                {description}
              </p>
            )}
          </div>
          <IconButton icon={X} label="Fechar" size="sm" onClick={onClose} />
        </header>

        {children && <div className={styles.body}>{children}</div>}

        {footer && <footer className={styles.footer}>{footer}</footer>}
      </div>
    </dialog>
  )
}
