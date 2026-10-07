import { PanelRow } from '@/shared/components/PanelRow/PanelRow'

import styles from './StripedDivider.module.scss'

export function StripedDivider() {
  return <PanelRow variant="striped" isDecorative className={styles.divider} />
}
