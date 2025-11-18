import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import CarCard from '../../components/cars/CarCard'
import { useCarTypes, useCars, useCreateBooking } from '../../hooks/index'
import { useAuth } from '../../context/AuthContext'
import PageTitle from '../../components/PageTitle'
import Button from '../../components/ui/Button'
import CarSkeleton from '../../components/ui/CarSkeleton'
import { CarDto } from '../../util/api'

function AvailableCars() {
  const location = useLocation()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [{ data: cars, loading: carsLoading, error: carsError }, refetchCars] = useCars()
  const [{ data: carTypes }] = useCarTypes()
  const { createBooking, loading: bookingLoading } = useCreateBooking()
  const [visibleCount, setVisibleCount] = useState(12)
  const [bookingCarId, setBookingCarId] = useState<number | null>(null)

  const { start, end } = location.state || {}
  const startDate = start ? new Date(start) : null
  const endDate = end ? new Date(end) : null

  const handleBookCar = async (car: CarDto) => {
    if (!user || !startDate || !endDate) {
      toast.error('Please login and select booking dates')
      return
    }

    setBookingCarId(car.id)
    try {
      await createBooking({
        carId: car.id,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
      })
      toast.success('Car booked successfully!')
      navigate('/bookings')
    } catch (error: unknown) {
      const message =
        (error as { response?: { data?: { message?: string } } })?.response?.data?.message ||
        'Failed to book car. Please try again.'
      toast.error(message)
    } finally {
      setBookingCarId(null)
    }
  }

  const getCarType = (carTypeId: number) => carTypes?.find(type => type.id === carTypeId)
  const visibleCars = cars?.slice(0, visibleCount) || []
  const hasMore = cars && cars.length > visibleCount

  return carsLoading ? (
    <div className="min-h-screen bg-primary pb-8 pt-12 lg:pt-0">
      <div className="container grid justify-center">
        <PageTitle title="Available Cars" />
        <div className="grid px-4 pt-4 max-md:space-y-6 lg:grid-cols-3 lg:gap-6 lg:px-16">
          <CarSkeleton count={6} />
        </div>
      </div>
    </div>
  ) : carsError ? (
    <div className="flex min-h-screen items-center justify-center bg-primary">
      <div className="rounded-lg bg-red-900/20 p-6 text-center backdrop-blur">
        <h3 className="mb-2 text-xl font-semibold text-white">Failed to Load Cars</h3>
        <p className="mb-4 text-red-200">
          {carsError.message || 'An error occurred while fetching cars'}
        </p>
        <button
          onClick={() => refetchCars()}
          className="rounded-lg bg-white px-6 py-2 text-primary transition hover:bg-gray-100"
        >
          Try Again
        </button>
      </div>
    </div>
  ) : !cars || cars.length === 0 ? (
    <div className="flex min-h-screen items-center justify-center bg-primary">
      <div className="text-center">
        <h3 className="mb-2 text-2xl font-semibold text-white">No Cars Available</h3>
      </div>
    </div>
  ) : (
    <div className="min-h-screen bg-primary pb-8 pt-12 lg:pt-0">
      <div className="grid justify-center">
        <PageTitle title="Available Cars" />
        <div className="grid px-4 max-md:space-y-6 lg:grid-cols-2 lg:gap-8 lg:px-16 xl:grid-cols-3 xl:gap-6 3xl:grid-cols-4">
          {visibleCars.map(car => {
            const carType = getCarType(car.carTypeId)
            return (
              <CarCard
                key={car.id}
                car={car}
                carType={carType}
                buttonText={bookingLoading && bookingCarId === car.id ? 'Booking...' : 'Book Car'}
                primaryButton={true}
                onButtonClick={() => handleBookCar(car)}
              />
            )
          })}
        </div>
        {hasMore && (
          <div className="mt-8 grid justify-center text-center">
            <Button
              text="Load More"
              isPrimary
              className="px-14 py-3"
              onClick={() => setVisibleCount(prev => prev + 12)}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default AvailableCars
