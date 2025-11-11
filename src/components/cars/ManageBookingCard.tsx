import { BookingWithReferences } from '../../util/api'

export default function ManageBookingCard({
  booking,
}: {
  booking: BookingWithReferences & { imageUrl: string | null }
}) {
  return (
    <div className="flex justify-center">
      <div className="w-72 text-text">
        <div className="flex justify-center  ">
          <img src={booking.imageUrl || undefined} alt="" className="w-60 " />
        </div>
        <div>
          <p className="font-lora text-xl font-medium">{booking.car.name}</p>
          <p>Requested by: {booking.renter.name}</p>
        </div>
        <div className="">
          <div>
            <p>from</p>
            <p>Pickup Date: {booking.startDate.toString()}</p>
          </div>
          <div>
            <p>to</p>
            <p>Return Date: {booking.endDate.toString()}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
