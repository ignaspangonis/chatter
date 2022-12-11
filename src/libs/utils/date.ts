// A function that transforms utc date string to localised string
export function getLocalisedDate(date: string) {
  const utcDate = new Date(date)
  const localDate = utcDate.toLocaleString()
  return localDate
}
