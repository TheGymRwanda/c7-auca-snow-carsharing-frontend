import { CalendarIcon, TimeIcon } from '../../assets'
import { convertMonth, timeFormatter } from '../../util/date'

interface BookingDateInfoProps {
  label: string
  date: Date
}

function BookingDateInfo({ label, date }: BookingDateInfoProps) {
  return (
    <div>
      <p>{label}</p>
      <div className="flex items-center gap-2 py-2">
        <CalendarIcon />
        <p>{`${date.getDate()} ${convertMonth(date.getMonth())} ${date.getFullYear()}`}</p>
      </div>
      <div className="flex items-center gap-2">
        <TimeIcon />
        <p>{timeFormatter(date)}</p>
      </div>
    </div>
  )
}

export default BookingDateInfo
