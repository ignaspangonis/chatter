export function getLocalisedDate(date: string) {
  const utcDate = new Date(date)
  const localDate = utcDate.toLocaleString()

  return localDate
}
