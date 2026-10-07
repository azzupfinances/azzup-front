'use client'

import { Plus } from 'lucide-react'
import { useId, useState, type ReactNode } from 'react'

import { classNames } from '@/shared/utils/class-names'

import styles from './Accordion.module.scss'

export type AccordionItem = {
  id: string
  title: string
  content: ReactNode
}

type AccordionProps = {
  items: AccordionItem[]
}

export function Accordion({ items }: AccordionProps) {
  const baseId = useId()
  const [openItemId, setOpenItemId] = useState<string | null>(null)

  function handleToggle(itemId: string) {
    setOpenItemId((currentItemId) => (currentItemId === itemId ? null : itemId))
  }

  return (
    <div className={styles.accordion}>
      {items.map((item) => {
        const isOpen = openItemId === item.id
        const panelId = `${baseId}-${item.id}`

        return (
          <div key={item.id} className={classNames(styles.item, isOpen && styles.open)}>
            <h3 className={styles.title}>
              <button
                type="button"
                className={styles.trigger}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => handleToggle(item.id)}
              >
                <span className={styles.icon} aria-hidden="true">
                  <Plus size={16} />
                </span>
                {item.title}
              </button>
            </h3>

            <div id={panelId} role="region" className={styles.panel}>
              <div className={styles.panelInner}>
                <div className={styles.panelContent}>{item.content}</div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
