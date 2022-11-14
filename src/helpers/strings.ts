export const simplifyString = (input: string): string => input.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase()

export const isNullOrEmpty = (input: string | null): boolean => {
  if (input === null || input.length === 0) {
    return true
  }
  return false
}
