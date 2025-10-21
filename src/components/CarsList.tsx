import CarCard from './CarCard'
import { useCarTypes, useCars } from '../hooks/index'
import { useNavigate } from 'react-router-dom'
import { ChevronBackIcon } from '../assets'

function CarsListPage() {
  const [{ data: cars, loading: carsLoading, error: carsError }, refetchCars] = useCars()
  const [{ data: carTypes }] = useCarTypes()
  const navigate = useNavigate()

  const getCarType = (carTypeId: number) => carTypes?.find(type => type.id === carTypeId)

  return carsLoading ? (
    <div className="flex min-h-screen items-center justify-center bg-primary">
      <div className="text-center">
        <div className="mx-auto mb-4 w-12 h-12 animate-spin rounded-full border-4 border-white/30 border-t-white"></div>
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
    <div className="min-h-screen bg-primary pb-8 pt-24">
      <div className="container mx-auto px-4">
        <div className="mx-2 flex content-center text-center">
          <button
            onClick={() => navigate('/')}
            className="cursor-pointer transition hover:opacity-80"
          >
            <ChevronBackIcon className="text-accent w-5 h-5" />
          </button>
          <div className="w-full text-center">
            <h1 className="font-lora text-3xl uppercase text-gray-200">Available Car</h1>
          </div>
        </div>
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

export default CarsListPage
