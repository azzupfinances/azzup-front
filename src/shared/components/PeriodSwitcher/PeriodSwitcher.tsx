'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'

import { IconButton } from '@/shared/components/IconButton/IconButton'
import { useTodayIsoDate } from '@/shared/hooks/useTodayIsoDate'
import { parseIsoDate } from '@/shared/utils/iso-date'

import styles from './PeriodSwitcher.module.scss'

const monthFormatter = new Intl.DateTimeFormat('pt-BR', { month: 'long', year: 'numeric' })

type PeriodUnit = 'month' | 'year'

const UNIT_LABELS: Record<PeriodUnit, { previous: string; next: string }> = {
  month: { previous: 'Mês anterior', next: 'Próximo mês' },
  year: { previous: 'Ano anterior', next: 'Próximo ano' },
}

function formatPeriod(today: Date, unit: PeriodUnit, offset: number) {
  if (unit === 'year') {
    return String(today.getFullYear() + offset)
  }

  return monthFormatter.format(new Date(today.getFullYear(), today.getMonth() + offset, 1))
}

type PeriodSwitcherProps = {
  unit?: PeriodUnit
}

// Steps back through months or years, never past the current one.
// Visual phase: only the label changes; screens will load the selected period later.
export function PeriodSwitcher({ unit = 'month' }: PeriodSwitcherProps) {
  const [offset, setOffset] = useState(0)
  const todayIsoDate = useTodayIsoDate()
  const labels = UNIT_LABELS[unit]
  const periodLabel = todayIsoDate ? formatPeriod(parseIsoDate(todayIsoDate), unit, offset) : ' '

  return (
    <div className={styles.switcher}>
      <IconButton
        icon={ChevronLeft}
        label={labels.previous}
        size="sm"
        onClick={() => setOffset((current) => current - 1)}
      />
      <span className={styles.label} aria-live="polite">
        {periodLabel}
      </span>
      <IconButton
        icon={ChevronRight}
        label={labels.next}
        size="sm"
        disabled={offset === 0}
        onClick={() => setOffset((current) => current + 1)}
      />
    </div>
  )
}
