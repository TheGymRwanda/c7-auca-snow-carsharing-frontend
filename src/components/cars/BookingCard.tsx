import { BookingState, BookingWithReferences } from '../../util/api'
import BookingDateInfo from './BookingDateInfo'
import BookingActions from './BookingActions'

type BookingCardProps = {
  booking: BookingWithReferences & { imageUrl: string | null; state: BookingState }
  variant: 'manage' | 'my'
  onUpdate?: () => void
}

function BookingCard({ booking, variant, onUpdate }: BookingCardProps) {
  const isManageVariant = variant === 'manage'
  const ownerText = isManageVariant
    ? `Requested by: ${booking.renter.name}`
    : `Owned by: ${booking.car.owner.name}`

  return (
    <div className="flex flex-col justify-center text-gray-100 lg:grid lg:grid-cols-2 lg:px-28">
      <div className="flex justify-center">
        <img
          src={booking.imageUrl || undefined}
          className="w-60 scale-115 md:w-72 md:scale-150 lg:w-80"
        />
      </div>
      <div className="max-w-md">
        <div className="px-6">
          <p className="font-lora text-xl font-medium lg:text-3xl">{booking.car.name}</p>
          <p className="lg:text-base lg:font-extralight">{ownerText}</p>
        </div>
        <div className="flex justify-between px-6 py-5 text-sm lg:text-base">
          <BookingDateInfo label="from" date={booking.startDate} />
          <BookingDateInfo label="to" date={booking.endDate} />
        </div>
        <BookingActions
          bookingId={booking.id}
          carId={booking.car.id}
          state={booking.state}
          variant={variant}
          onUpdate={onUpdate}
        />
      </div>
    </div>
  )
}

export default BookingCard
