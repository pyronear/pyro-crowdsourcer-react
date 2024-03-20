export interface DateValidity { date: boolean, time: boolean }

/**
 * Checks whether the given date and time is before today and current time.
 *
 * ```ts
 * const now = new Date(2024, 02, 12, 22, 30); // Apr 12 2024 22:30:00
 * const pastDate = new Date(2024, 02, 11, 22, 30); // Apr 11 2024 22:30:00
 * const futureDateToday = new Date(2024, 02, 12, 22, 31); // Apr 12 2024 22:31:00
 * const futureDateTomorrow = new Date(2024, 02, 13, 22, 30); // Apr 13 2024 22:30:00
 *
 * const isDateAndTimeBeforeNow(pastDate); // { date: true, time: true }
 * const isDateAndTimeBeforeNow(futureDateToday); // { date: true, time: false }
 * const isDateAndTimeBeforeNow(futureDateTomorrow); // { date: false, time: false }
 * ```
 */
export const isDateAndTimeBeforeNow = (date: Date): DateValidity => {
  const now = new Date()
  const todayMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const dateMidnight = new Date(date.getFullYear(), date.getMonth(), date.getDate())

  const isDateValid = dateMidnight.getTime() <= todayMidnight.getTime()
  const isTimeValid = (dateMidnight.getTime() < todayMidnight.getTime() || date.getTime() <= now.getTime())
  return { date: isDateValid, time: isTimeValid }
}
