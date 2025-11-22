import { useBookings, useCarTypes } from '../../hooks'
import { useAuth } from '../../context/AuthContext'
import BookingCard from '../../components/cars/BookingCard'
import Loader from '../../components/ui/Loader'
import { BookingState, BookingWithReferences } from '../../util/api'
import PageTitle from '../../components/PageTitle'

export default function ManageBooking() {
  const { user } = useAuth()
  const { data: bookings, loading, error, refetch } = useBookings()
  const [{ data: carTypes }] = useCarTypes()

  if (loading) return <Loader />
  if (error || !bookings || !user) return <div>Error</div>

  const bookingsForCarOfCurrentUser = (
    bookings as (BookingWithReferences & { state: BookingState })[]
  )
    .filter(booking => booking.car.ownerId === user.id)
    .map(booking => {
      const bookingState = booking.state /// add booking state as a state
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
      <PageTitle title="Manage Bookings" />
      <div className="lg:px-12">
        {bookingsForCarOfCurrentUser.length === 0 ? (
          <p className="mt-10 text-center text-text">No bookings for your cars.</p>
        ) : (
          <ul className="mt-10 space-y-4 px-5">
            {bookingsForCarOfCurrentUser.map(booking => (
              <>
                <li className="lg:pt-14" key={booking.id}>
                  <BookingCard booking={booking} variant="manage" onUpdate={refetch} />
                </li>
                <hr />
              </>
            ))}
          </ul>
        )}
      </div>
    </>
  )
}
