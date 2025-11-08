import { CarDto, CarTypeDto, UserDto } from '../../util/api'
import {
  CarIcon,
  HorseIcon,
  FuelIcon,
  ProfileIcon,
  AttentionIcon,
  LicenseIcon,
} from '../../assets/index'

interface DetailsProps {
  car: CarDto
  carType?: CarTypeDto
  owner?: UserDto
  ownerLoading?: boolean
}

function Details({ car, carType, ownerLoading, owner }: DetailsProps) {
  const detailItems = [
    {
      icon: <ProfileIcon />,
      content: ownerLoading ? (
        <span className="flex items-center gap-2">
          <div className="size-4 animate-spin rounded-full border-2 border-white/30 border-t-white"></div>
          Loading...
        </span>
      ) : (
        <span>{owner?.name || `Owner ${car.ownerId}`}</span>
      ),
    },
    { icon: <CarIcon />, content: car.state },
    { icon: <LicenseIcon className="ml-1" />, content: car.licensePlate },
    { icon: <HorseIcon />, content: `${car.horsepower} HP` },
    { icon: <FuelIcon />, content: car.fuelType.charAt(0).toUpperCase() + car.fuelType.slice(1) },
    {
      icon: <AttentionIcon />,
      content: <p className="overflow-wrap-anywhere font-bold">{car.info}</p>,
    },
  ]

  return (
    <div className="items-center lg:gap-64">
      <div className="mt-8 h-60 w-60 scale-130 justify-self-center overflow-hidden">
        <img
          src={carType?.imageUrl || '/img/car.png'}
          alt={car.name}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="px-10 tracking-wide">
        <h2 className="font-lora text-xl font-thin">{car.name}</h2>
        <ul className="mt-7 space-y-2 text-sm md:text-xl">
          {detailItems
            .filter(item => item.content)
            .map((item, index) => (
              <li key={index} className="flex items-center gap-3">
                {item.icon} {item.content}
              </li>
            ))}
        </ul>
      </div>
    </div>
  )
}

export default Details
