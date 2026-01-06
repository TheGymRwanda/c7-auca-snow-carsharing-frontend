export function convertMonth(month: number) {
  return new Intl.DateTimeFormat('en', { month: 'short' }).format(new Date(2000, month))
}

export function timeFormatter(dateTime: Date): string {
  const minutes = dateTime.getMinutes()
  const hours = dateTime.getHours()
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes
  return `${hours}:${formattedMinutes}`
}
