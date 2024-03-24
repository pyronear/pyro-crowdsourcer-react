import { isDateAndTimeBeforeNow } from './date'

describe('isDateAndTimeBeforeNow', () => {
  it('It should return true for a date before today', () => {
    jest
      .useFakeTimers()
      .setSystemTime(new Date('2020-01-01'))

    const result = isDateAndTimeBeforeNow(new Date('2019-12-31'))

    expect(result).toEqual({ date: true, time: true })
  })
  it('It should return false for a date after today', () => {
    jest
      .useFakeTimers()
      .setSystemTime(new Date('2020-01-01'))

    const result = isDateAndTimeBeforeNow(new Date('2020-01-02'))

    expect(result).toEqual({ date: false, time: false })
  })
  it('It should return true for today that is earlier than now', () => {
    jest
      .useFakeTimers()
      .setSystemTime(new Date('2020-01-01 12:00'))

    const result = isDateAndTimeBeforeNow(new Date('2020-01-01 11:00'))

    expect(result).toEqual({ date: true, time: true })
  })

  it('It should return date true and time false for today that is later than now', () => {
    jest
      .useFakeTimers()
      .setSystemTime(new Date('2020-01-01 12:00'))

    const result = isDateAndTimeBeforeNow(new Date('2020-01-01 13:00'))

    expect(result).toEqual({ date: true, time: false })
  })
})
