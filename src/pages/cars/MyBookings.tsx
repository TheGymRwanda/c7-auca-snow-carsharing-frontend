import { useBookings, useCarTypes } from '../../hooks'
import { useAuth } from '../../context/AuthContext'
import BookingSkeleton from '../../components/cars/BookingSkeleton'
import { BookingState, BookingWithReferences } from '../../util/api'
import BookingCard from '../../components/cars/BookingCard'
import PageTitle from '../../components/PageTitle'

function ManageBooking() {
  const { user } = useAuth()
  const { data: bookings, loading, error } = useBookings()
  const [{ data: carTypes }] = useCarTypes()

  if (loading) {
    return (
      <>
        <PageTitle title="My Bookings" />
        <div className="lg:px-12">
          <ul className="mt-14 space-y-4 px-5">
            {Array.from({ length: 3 }).map((_, index) => (
              <li className="lg:pt-14" key={index}>
                <BookingSkeleton variant="my" />
                {index < 2 && <hr />}
              </li>
            ))}
          </ul>
        </div>
      </>
    )
  }
  if (error || !bookings || !user) return <div>Error</div>

  const bookingsForCarOfCurrentUser = (
    bookings as (BookingWithReferences & { state: BookingState })[]
  )
    .filter(booking => booking.renterId === user.id)
    .map(booking => {
      const bookingState = booking.state
      return {
        ...booking,
        state: bookingState,
        startDate: new Date(booking.startDate),
        endDate: new Date(booking.endDate),
        imageUrl: carTypes?.find(carType => carType.id === booking.car.carTypeId)?.imageUrl || null,
      }
    })

  return (
    <>
      <PageTitle title="My Bookings" />
      <div className="lg:px-12">
        {bookingsForCarOfCurrentUser.length === 0 ? (
          <p className="mt-10 text-center text-text">You have not book a cart yet.</p>
        ) : (
          <ul className="mt-10 space-y-4 px-5">
            {bookingsForCarOfCurrentUser.map((booking, index) => (
              <li className="lg:pt-14" key={booking.id}>
                <BookingCard booking={booking} variant="my" />
                {index < bookingsForCarOfCurrentUser.length - 1 && <hr />}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  )
}

export default ManageBooking
