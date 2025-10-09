import { useParams, useNavigate } from 'react-router-dom'
import { ChevronBackIcon } from '../assets/ChevronBackIcon'
import CarIcon from '../assets/CarIcon'
import HorseIcon from '../assets/HorseIcon'
import FuelIcon from '../assets/FuelIcon'
import XIcon from '../assets/XIcon'
import ProfileIcon from '../assets/ProfileIcon'
import useCars from '../hooks/useCars'
import useCarTypes from '../hooks/useCarTypes'
import useUser from '../hooks/useUser'

// eslint-disable-next-line max-lines-per-function
const CarDetails = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const [{ data: cars, loading: carsLoading, error: carsError }] = useCars()
  const [{ data: carTypes, loading: typesLoading }] = useCarTypes()

  // Find the specific car by ID from URL params
  const car = cars?.find(c => c.id === Number(id))
  const carType = carTypes?.find(type => type.id === car?.carTypeId)

  const [{ data: owner, loading: ownerLoading }] = useUser(car?.ownerId || 0)

  // Loading state for main data
  if (carsLoading || typesLoading) {
    return (
      <div className="mt-10 flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 size-12 animate-spin rounded-full border-4 border-white/30 border-t-white"></div>
          <p className="text-lg text-white">Loading car details...</p>
        </div>
      </div>
    )
  }

  // Error state or car not found
  if (carsError || !car) {
    return (
      <div className="mt-10 flex min-h-screen items-center justify-center">
        <div className="text-center text-red-400">
          <h3 className="mb-2 text-xl font-semibold">Car not found</h3>
          <button
            onClick={() => navigate('/car')}
            className="mt-4 rounded-lg bg-white px-6 py-2 text-[#2C5F77] transition hover:bg-gray-100"
          >
            Back to Cars List
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="mt-10 h-screen space-y-11 text-[#F9FAFB]">
      <div className="flex items-center justify-between pl-5 pt-5 text-2xl md:text-5xl">
        <button
          onClick={() => navigate('/car')}
          className="cursor-pointer transition hover:opacity-80"
        >
          <ChevronBackIcon className="text-[#F8FCAD]" />
        </button>
        <h1 className="font-bold">Details</h1>
        <p></p>
      </div>
      <div className="items-center gap-32 space-y-11 pl-11 sm:flex lg:gap-64">
        <img
          src={carType?.imageUrl || '/img/car.png'}
          alt={car.name}
          className="w-[80%] sm:w-[40%]"
        />
        <div>
          <h2 className="text-xl font-medium md:text-3xl">{car.name}</h2>
          <ul className="text-md mt-7 space-y-2 md:text-xl">
            {/* Owner name */}
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
            {/* Car state (LOCKED/UNLOCKED) */}
            <li className="flex items-center gap-2">
              <CarIcon /> {car.state}
            </li>
            {/* License plate */}
            <li className="flex items-center gap-2">
              <CarIcon /> {car.licensePlate || 'No license plate'}
            </li>
            {/* Horsepower */}
            <li className="flex items-center gap-2">
              <HorseIcon /> {car.horsepower ? `${car.horsepower} HP` : 'N/A'}
            </li>
            {/* Fuel type */}
            <li className="flex items-center gap-2">
              <FuelIcon /> {car.fuelType.charAt(0).toUpperCase() + car.fuelType.slice(1)}
            </li>
            {/* Additional info or car type name */}
            <li className="flex items-center gap-2">
              <XIcon /> {car.info || carType?.name || 'N/A'}
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default CarDetails
