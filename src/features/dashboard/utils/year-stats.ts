import type { SampleMonthResult } from '@/features/dashboard/constants/dashboard-sample'

export function getSavedInCents(month: SampleMonthResult) {
  return month.incomeInCents - month.expensesInCents
}

// The last month is still in progress: it counts in the totals but not in
// "best month", the average or "months in the blue", since its expenses are not final.
export function getYearStats(months: SampleMonthResult[]) {
  const incomeInCents = months.reduce((sum, month) => sum + month.incomeInCents, 0)
  const expensesInCents = months.reduce((sum, month) => sum + month.expensesInCents, 0)
  const savedInCents = incomeInCents - expensesInCents

  const closedMonths = months.slice(0, -1)
  const bestMonth = closedMonths.reduce((best, month) =>
    getSavedInCents(month) > getSavedInCents(best) ? month : best,
  )
  const averageSavedInCents = Math.round(
    closedMonths.reduce((sum, month) => sum + getSavedInCents(month), 0) / closedMonths.length,
  )

  return {
    incomeInCents,
    expensesInCents,
    savedInCents,
    savedPercentage: Math.round((savedInCents / incomeInCents) * 100),
    currentMonth: months[months.length - 1],
    closedMonthsCount: closedMonths.length,
    bestMonth,
    averageSavedInCents,
    positiveMonthsCount: closedMonths.filter((month) => getSavedInCents(month) > 0).length,
  }
}
