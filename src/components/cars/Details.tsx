import { CarDto, CarTypeDto, UserDto } from '../../util/api'
import { CarIcon, HorseIcon, FuelIcon, XIcon, ProfileIcon } from '../../assets/index'

interface DetailsProps {
  car: CarDto
  carType?: CarTypeDto
  owner?: UserDto
  ownerLoading?: boolean
}

function Details({ car, carType, ownerLoading, owner }: DetailsProps) {
  const imageUrl = (carType?.imageUrl ?? '').trim() || undefined

  if (!car || !carType || !carType.name || !imageUrl) {
    return null
  }
  return (
    <div className="items-center space-y-1 lg:gap-64">
      <img
        src={imageUrl}
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
  )
}

export default Details
