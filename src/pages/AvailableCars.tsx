import { useState } from 'react'
import CarCard from '../components/cars/CarCard'
import { useCarTypes, useCars } from '../hooks/index'
import PageTitle from '../components/PageTitle'
import Button from '../components/ui/Button'

function AvailableCars() {
  const [{ data: cars, loading: carsLoading, error: carsError }, refetchCars] = useCars()
  const [{ data: carTypes }] = useCarTypes()
  const [visibleCount, setVisibleCount] = useState(12)

  const getCarType = (carTypeId: number) => carTypes?.find(type => type.id === carTypeId)
  const visibleCars = cars?.slice(0, visibleCount) || []
  const hasMore = cars && cars.length > visibleCount

  return carsLoading ? (
    <div className="flex min-h-screen items-center justify-center bg-primary">
      <div className="text-center">
        <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-white/30 border-t-white"></div>
        <p className="text-lg text-white">Loading ...</p>
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
      <div className="container grid justify-center">
        <PageTitle title="Available Cars" />
        <div className="grid px-4 max-md:space-y-6 lg:grid-cols-3 lg:gap-6 lg:px-16">
          {visibleCars.map(car => {
            const carType = getCarType(car.carTypeId)
            return (
              <CarCard
                key={car.id}
                car={car}
                carType={carType}
                buttonText="Book Car"
                primaryButton={true}
                onButtonClick={() => {}}
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
