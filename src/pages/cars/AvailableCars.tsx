import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import CarCard from '../../components/cars/CarCard'
import { useBookings, useCarTypes, useCars, useCreateBooking } from '../../hooks/index'
import { useAuth } from '../../context/AuthContext'
import PageTitle from '../../components/PageTitle'
import Button from '../../components/ui/Button'
import CarSkeleton from '../../components/ui/CarSkeleton'
import { CarDto } from '../../util/api'

const LoadingSkeleton = () => (
  <div className="min-h-screen bg-primary pb-8 pt-12 lg:pt-0">
    <div className="container grid justify-center">
      <PageTitle title="Available Cars" />
      <div className="grid px-4 pt-4 max-md:space-y-6 lg:grid-cols-3 lg:gap-6 lg:px-16">
        <CarSkeleton count={6} />
      </div>
    </div>
  </div>
)

const ErrorDisplay = ({ error, onRetry }: { error: { message?: string }; onRetry: () => void }) => (
  <div className="flex min-h-screen items-center justify-center bg-primary">
    <div className="rounded-lg bg-red-900/20 p-6 text-center backdrop-blur">
      <h3 className="mb-2 text-xl font-semibold text-white">Failed to Load Cars</h3>
      <p className="mb-4 text-red-200">
        {error.message || 'An error occurred while fetching cars'}
      </p>
      <Button text="Try Again" isPrimary onClick={onRetry} className="px-6 py-2" />
    </div>
  </div>
)

const EmptyState = () => (
  <div className="flex min-h-screen items-center justify-center bg-primary">
    <div className="text-center">
      <h3 className="mb-2 text-2xl font-semibold text-white">No Cars Available</h3>
    </div>
  </div>
)

function AvailableCars() {
  const location = useLocation()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [{ data: cars, loading: carsLoading, error: carsError }, refetchCars] = useCars()
  const [{ data: carTypes }] = useCarTypes()
  const { data: bookings, loading: bookingsLoading } = useBookings()
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

  const availableCars =
    cars?.filter(car => {
      if (car.ownerId === user?.id) return false
      const isBooked = bookings?.some(
        booking => booking.carId === car.id && booking.renterId === user?.id,
      )
      return !isBooked
    }) || []

  const visibleCars = availableCars.slice(0, visibleCount)
  const hasMore = availableCars.length > visibleCount

  if (carsLoading || bookingsLoading) return <LoadingSkeleton />
  if (carsError) return <ErrorDisplay error={carsError} onRetry={() => refetchCars()} />
  if (!availableCars || availableCars.length === 0) return <EmptyState />

  return (
    <div className="min-h-screen bg-primary-dark pb-8 pt-12 lg:pt-0">
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
      <ToastContainer />
    </div>
  )
}

export default AvailableCars
