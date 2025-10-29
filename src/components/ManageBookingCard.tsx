import { BookingWithReferences } from '../util/api'

export default function ManageBookingCard({ booking }: { booking: BookingWithReferences }) {
  return (
    <div>
      <div className="text-text">
        <p>Car: {booking.car.name}</p>
        <p>Pickup Date: {booking.startDate.toString()}</p>
        <p>Return Date: {booking.endDate.toString()}</p>
      </div>
    </div>
  )
}
