// import axios from 'axios'
import { CalendarIcon, TimeIcon } from '../../assets'
import { BookingState, BookingWithReferences } from '../../util/api'
import { formatBookingStatus } from '../../util/booking'
import { convertMonth, timeFormatter } from '../../util/date'

function MyBookingCard({
  booking,
}: {
  booking: BookingWithReferences & { imageUrl: string | null; state: BookingState }
}) {
  return (
    <div className="flex flex-col justify-center">
      <div className="w-72 text-text">
        <div className="flex justify-center  ">
          <img src={booking.imageUrl || undefined} alt="" className="w-60 " />
        </div>
        <div>
          <p className="font-lora text-xl font-medium">{booking.car.name}</p>
          <p>Owned by: {booking.car.owner.name}</p>
        </div>
        <div className="flex justify-between py-5 text-sm">
          <div>
            <p>from</p>
            <div className="flex items-center gap-2 py-2">
              <CalendarIcon />
              <p>{`${booking.startDate.getDate()}  ${convertMonth(
                booking.startDate.getMonth(),
              )} ${booking.startDate.getFullYear()}`}</p>
            </div>
            <div className="flex items-center gap-2">
              <TimeIcon />
              <p>{timeFormatter(booking.startDate)}</p>
            </div>
          </div>
          <div>
            <p>to</p>
            <div className="flex items-center gap-2 py-2">
              <CalendarIcon />
              <p>
                {`${booking.endDate.getDate()} ${convertMonth(
                  booking.endDate.getMonth(),
                )} ${booking.endDate.getFullYear()}`}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <TimeIcon />
              <p>{timeFormatter(booking.endDate)}</p>
            </div>
          </div>
        </div>
      </div>
      {booking.state === BookingState.PENDING ? (
        <p className="text-error">booking request is pending.</p>
      ) : (
        <p className="text-amber-200">{formatBookingStatus(booking.state)}</p>
      )}
    </div>
  )
}

export default MyBookingCard
