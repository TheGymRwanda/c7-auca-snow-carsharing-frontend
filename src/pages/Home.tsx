import { useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { Button, BrandHeader } from '../components/ui'
import { useAuth } from '../context/AuthContext'
import useCars from '../hooks/useCars'
import useCarTypes from '../hooks/useCarTypes'
import { useBookings } from '../hooks/index'
import HomeCarsRow from '../components/home/HomeCarsRow'

const Home = () => {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [{ data: cars, loading: carsLoading }] = useCars()
  const [{ data: carTypes }] = useCarTypes()
  const { data: bookings, loading: bookingsLoading } = useBookings()
  const loading = carsLoading || bookingsLoading

  const myCars = cars?.filter(c => c.ownerId === user?.id) || []

  const availableCars =
    cars?.filter(car => {
      if (car.ownerId === user?.id) return false

      const isBooked = bookings?.some(
        booking => booking.carId === car.id && booking.renterId === user?.id,
      )
      return !isBooked
    }) || []

  return (
    <div className="flex flex-col justify-start bg-primary-dark text-center text-white max-lg:mt-28 lg:text-start">
      <div className="z-50 items-center bg-primary-dark p-6 lg:p-10 xl:p-12 2xl:p-16 ">
        <div className="lg:hidden">
          <BrandHeader />
        </div>

        <p className="mb-12 font-lora text-xl lg:space-y-2 lg:text-3xl 2xl:text-5xl">
          {`Hello ${user?.name} !`} <br />
          <span>What are you up to today?</span>
        </p>
        <div className="space-y-5 lg:hidden">
          <Button
            text="Book Car"
            className="py-3"
            isPrimary
            onClick={() => navigate('/book-car')}
          />

          <p className="mb-10 text-sm">or</p>
          <div className="mt-4 flex w-full flex-col space-y-6">
            <Button
              text="See My Cars"
              className="py-3"
              isPrimary={false}
              onClick={() => navigate('/my-cars')}
            />
            <Button
              text="See My Bookings"
              isPrimary={false}
              className="py-3"
              onClick={() => navigate('/bookings')}
            />
          </div>
        </div>
        <div className="max-lg:hidden">
          <HomeCarsRow
            title="Available Cars"
            cars={availableCars}
            loading={loading}
            carTypes={carTypes}
            seeMoreLink="/book-car"
            onButtonClick={() => navigate('/book-car')}
          />
          <HomeCarsRow
            title="My Cars"
            cars={myCars}
            carTypes={carTypes}
            loading={loading}
            seeMoreLink="/my-cars"
          />
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default Home
