import { parseIsoDate } from '@/shared/utils/iso-date'

const shortMonthFormatter = new Intl.DateTimeFormat('pt-BR', { month: 'short' })

// "2027-07-15" → "jul/2027". Intl adds a trailing dot to short months ("jul."), removed here.
export function formatMonthYear(isoDate: string) {
  const date = parseIsoDate(isoDate)
  const month = shortMonthFormatter.format(date).replace('.', '')

  return `${month}/${date.getFullYear()}`
}
