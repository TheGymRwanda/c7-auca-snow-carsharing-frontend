import { useNavigate } from 'react-router-dom'
import { ChevronBackIcon } from '../../assets'
import { useBookings, useCarTypes } from '../../hooks'
import { useAuth } from '../../context/AuthContext'
import Loader from '../../components/ui/Loader'
import { BookingState, BookingWithReferences } from '../../util/api'
import MyBookingCard from '../../components/cars/MyBookingCard'

function ManageBooking() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { data: bookings, loading, error } = useBookings()
  const [{ data: carTypes }] = useCarTypes()

  if (loading) return <Loader />
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
    <div className="pt-24">
      <div className="relative px-5 ">
        <div
          className=" absolute inset-3 inline cursor-pointer text-text"
          onClick={() => navigate(-1)}
        >
          <ChevronBackIcon />
        </div>
        <h1 className=" text-center text-3xl font-medium  uppercase text-text">my bookings</h1>
      </div>

      <div>
        {bookingsForCarOfCurrentUser.length === 0 ? (
          <p className="mt-10 text-center text-text">You have not book a cart yet.</p>
        ) : (
          <ul className="mt-10 space-y-4 px-5">
            {bookingsForCarOfCurrentUser.map(booking => (
              <>
                <li key={booking.id}>
                  <MyBookingCard booking={booking} />
                </li>
                <hr />
              </>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default ManageBooking
