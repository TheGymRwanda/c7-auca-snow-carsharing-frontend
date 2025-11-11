import { useNavigate } from 'react-router-dom'
import { ChevronBackIcon } from '../assets'
import { useBookings, useCarTypes } from '../hooks'
import { useAuth } from '../context/AuthContext'
import ManageBookingCard from '../components/cars/ManageBookingCard'
import LoaderComponent from '../components/ui/Loader'

export default function ManageBooking() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { data: bookings, loading, error } = useBookings()
  const [{ data: carTypes }] = useCarTypes()

  if (loading) return <LoaderComponent />
  if (error || !bookings || !user) return <div>Error</div>

  const bookingsForCarOfCurrentUser = bookings.map(booking => ({
    ...booking,
    imageUrl: carTypes?.find(carType => carType.id === booking.car.carTypeId)?.imageUrl || null,
  })) /// replace by user.id

  // const bookingsForCarOfCurrentUser = bookings.filter(booking => booking.car.ownerId === user.id) /// replace by user.id

  console.log(bookingsForCarOfCurrentUser)
  console.log(bookings)
  console.log(user)

  return (
    <div className="pt-24">
      <div className="relative px-5 ">
        <div
          className=" absolute inset-3 inline cursor-pointer text-text"
          onClick={() => navigate(-1)}
        >
          <ChevronBackIcon />
        </div>
        <h1 className=" text-center text-3xl font-medium  text-text"> MANAGE BOOKINGS</h1>
      </div>

      <div>
        {bookingsForCarOfCurrentUser.length === 0 ? (
          <p className="mt-10 text-center text-text">No bookings for your cars.</p>
        ) : (
          <ul className="mt-10 space-y-4 px-5">
            {bookingsForCarOfCurrentUser.map(booking => (
              <li key={booking.id}>
                <ManageBookingCard booking={booking} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
