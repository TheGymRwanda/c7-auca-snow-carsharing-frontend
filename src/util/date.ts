export function convertMonth(month: number) {
  switch (month) {
    case 0:
      return 'Jan'
    case 1:
      return 'Feb'
    case 2:
      return 'Mar'
    case 3:
      return 'Apr'
    case 4:
      return 'May'
    case 5:
      return 'Jun'
    case 6:
      return 'Jul'
    case 7:
      return 'Aug'
    case 8:
      return 'Sep'
    case 9:
      return 'Oct'
    case 10:
      return 'Nov'
    case 11:
      return 'Dec'
    default:
      throw new Error('Invalid month')
  }
}

export function timeFormatter(dateTime: Date): string {
  const minutes = dateTime.getMinutes()
  const hours = dateTime.getHours()
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes
  return `${hours}:${formattedMinutes}`
}
