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

// Same day N months later; when that day does not exist (e.g. 31 in February), the last
// day of the target month is used. Always computed from the original day, so a series
// starting on the 31st returns to the 31st in longer months.
export function addMonthsToIsoDate(isoDate: string, months: number) {
  const [year, month, day] = isoDate.split('-').map(Number)
  const targetMonthStart = new Date(year, month - 1 + months, 1)
  const lastDayOfTargetMonth = new Date(
    targetMonthStart.getFullYear(),
    targetMonthStart.getMonth() + 1,
    0,
  ).getDate()

  targetMonthStart.setDate(Math.min(day, lastDayOfTargetMonth))

  return toIsoDate(targetMonthStart)
}

// "YYYY-MM", comparable as a string.
export function getIsoMonth(isoDate: string) {
  return isoDate.slice(0, 7)
}

const MILLISECONDS_PER_DAY = 24 * 60 * 60 * 1000

// Whole days from one date to another; negative when `toIsoDate` is earlier.
export function getDaysBetweenIsoDates(fromIsoDate: string, toIsoDateValue: string) {
  const differenceInMilliseconds = parseIsoDate(toIsoDateValue).getTime() - parseIsoDate(fromIsoDate).getTime()

  // Rounded because a daylight saving change makes a day 23 or 25 hours long.
  return Math.round(differenceInMilliseconds / MILLISECONDS_PER_DAY)
}

// Calendar months from one date to another, ignoring the day ("2026-06-30" → "2026-07-01" is 1).
export function getMonthsBetweenIsoDates(fromIsoDate: string, toIsoDateValue: string) {
  const [fromYear, fromMonth] = fromIsoDate.split('-').map(Number)
  const [toYear, toMonth] = toIsoDateValue.split('-').map(Number)

  return (toYear - fromYear) * 12 + (toMonth - fromMonth)
}
