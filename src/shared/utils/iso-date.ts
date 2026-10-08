// Dates without time are kept as ISO strings (YYYY-MM-DD) in the user's local calendar.

// `new Date('YYYY-MM-DD')` is parsed as UTC and can land on the previous day in Brazil,
// so the parts are read as a local date instead.
export function parseIsoDate(isoDate: string) {
  const [year, month, day] = isoDate.split('-').map(Number)

  return new Date(year, month - 1, day)
}

export function toIsoDate(date: Date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

export function getTodayIsoDate() {
  return toIsoDate(new Date())
}

export function addDaysToIsoDate(isoDate: string, days: number) {
  const date = parseIsoDate(isoDate)
  date.setDate(date.getDate() + days)

  return toIsoDate(date)
}
