import useCars from '../hooks/useCars'
import useCarTypes from '../hooks/useCarTypes'
import CarCard from './carCard'

export default function CarsListPage() {
  const [{ data: cars, loading: carsLoading, error: carsError }, refetchCars] = useCars()
  const [{ data: carTypes }] = useCarTypes()

  // Get car type info by id
  const getCarType = (carTypeId: number) => carTypes?.find(type => type.id === carTypeId)

  if (carsLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#2C5F77]">
        <div className="text-center">
          <div className="mx-auto mb-4 size-12 animate-spin rounded-full border-4 border-white/30 border-t-white"></div>
          <p className="text-lg text-white">Loading available cars...</p>
        </div>
      </div>
    )
  }

  if (carsError) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#2C5F77]">
        <div className="rounded-lg bg-red-900/20 p-6 text-center backdrop-blur">
          <h3 className="mb-2 text-xl font-semibold text-white">Failed to Load Cars</h3>
          <p className="mb-4 text-red-200">
            {carsError.message || 'An error occurred while fetching cars'}
          </p>
          <button
            onClick={() => refetchCars()}
            className="rounded-lg bg-white px-6 py-2 text-[#2C5F77] transition hover:bg-gray-100"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  if (!cars || cars.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#2C5F77]">
        <div className="text-center">
          <h3 className="mb-2 text-2xl font-semibold text-white">No Cars Available</h3>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#2C5F77] pb-8 pt-24">
      <div className="container mx-auto px-4">
        <div className="space-y-6">
          {cars.map(car => {
            const carType = getCarType(car.carTypeId)
            return <CarCard key={car.id} car={car} carType={carType} />
          })}
        </div>
      </div>
    </div>
  )
}
