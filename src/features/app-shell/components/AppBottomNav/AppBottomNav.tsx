import { NavLink } from '@/features/app-shell/components/NavLink/NavLink'
import { NewTransactionButton } from '@/features/app-shell/components/NewTransactionButton/NewTransactionButton'
import { NAVIGATION_ITEMS, type NavigationItem } from '@/features/app-shell/constants/navigation'

import styles from './AppBottomNav.module.scss'

const middleIndex = Math.ceil(NAVIGATION_ITEMS.length / 2)

// Phone and tablet navigation (below `lg`): two tabs, the new transaction button, two tabs.
export function AppBottomNav() {
  return (
    <nav className={styles.bottomNav} aria-label="Menu principal">
      <ul className={styles.list}>
        {NAVIGATION_ITEMS.slice(0, middleIndex).map(renderTab)}
        <li className={styles.item}>
          <NewTransactionButton variant="fab" />
        </li>
        {NAVIGATION_ITEMS.slice(middleIndex).map(renderTab)}
      </ul>
    </nav>
  )
}

function renderTab(item: NavigationItem) {
  return (
    <li key={item.href} className={styles.item}>
      <NavLink
        href={item.href}
        label={item.label}
        icon={<item.icon size={20} aria-hidden="true" />}
        variant="tab"
      />
    </li>
  )
}
