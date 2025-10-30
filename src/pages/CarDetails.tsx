import { useParams, useNavigate } from 'react-router-dom'
import { ChevronBackIcon, CarIcon, HorseIcon, FuelIcon, XIcon, ProfileIcon } from '../assets/index'
import { useCars, useCarTypes, useUser } from '../hooks/index'

const CarDetails = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const [{ data: cars, loading: carsLoading, error: carsError }] = useCars()
  const [{ data: carTypes, loading: typesLoading }] = useCarTypes()

  const car = cars?.find(c => c.id === Number(id))
  const carType = carTypes?.find(type => type.id === car?.carTypeId)

  const [{ data: owner, loading: ownerLoading }] = useUser(car?.ownerId || 0)

  if (carsLoading || typesLoading) {
    return (
      <div className="mt-10 flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-white/30 border-t-white"></div>
          <p className="text-lg text-white">Loading ...</p>
        </div>
      </div>
    )
  }

  if (carsError || !car) {
    return (
      <div className="mt-10 flex min-h-screen items-center justify-center">
        <div className="text-center text-red-400">
          <h3 className="mb-2 text-xl font-semibold">Car not found</h3>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 rounded-lg bg-white px-6 py-2 text-[#2C5F77] transition hover:bg-gray-100"
          >
            Back to Cars List
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className=" min-h-screen space-y-4 overflow-y-hidden px-6 pt-20 text-[#F9FAFB]">
      <div className="flex content-center text-center">
        <button onClick={() => navigate(-1)} className="cursor-pointer transition hover:opacity-80">
          <ChevronBackIcon className="h-5 w-5 text-accent" />
        </button>
        <div className="w-full text-center">
          <h1 className="font-lora text-3xl uppercase text-gray-200">Details</h1>
        </div>
      </div>
      <div className="items-center space-y-1 lg:gap-64">
        <img
          src={carType?.imageUrl || '/img/car.png'}
          alt={car.name}
          className="h-80 w-fit justify-self-center"
        />
        <div className="px-6">
          <h2 className="font-lora text-3xl font-medium">{car.name}</h2>
          <ul className="text-md mt-7 space-y-2 md:text-xl">
            <li className="flex items-center gap-2">
              <ProfileIcon />
              {ownerLoading ? (
                <span className="flex items-center gap-2">
                  <div className="size-4 animate-spin rounded-full border-2 border-white/30 border-t-white"></div>
                  Loading...
                </span>
              ) : (
                <span>{owner?.name || `Owner ${car.ownerId}`}</span>
              )}
            </li>
            <li className="flex items-center gap-2">
              <CarIcon /> {car.state}
            </li>
            <li className="flex items-center gap-2">
              <CarIcon /> {car.licensePlate || 'No license plate'}
            </li>
            <li className="flex items-center gap-2">
              <HorseIcon /> {car.horsepower ? `${car.horsepower} HP` : 'N/A'}
            </li>
            <li className="flex items-center gap-2">
              <FuelIcon /> {car.fuelType.charAt(0).toUpperCase() + car.fuelType.slice(1)}
            </li>
            <li className="flex items-center gap-2">
              <XIcon className="h-6 w-6" />
              <p className="overflow-wrap-anywhere">{car.info || carType?.name || 'N/A'}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default CarDetails
