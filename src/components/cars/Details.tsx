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
      icon: <ProfileIcon className="lg:size-full" />,
      content: ownerLoading ? (
        <span className="flex items-center gap-2">
          <div className="size-4 animate-spin rounded-full border-2 border-white/30 border-t-white"></div>
          Loading...
        </span>
      ) : (
        <span>{owner?.name || `Owner ${car.ownerId}`}</span>
      ),
    },
    { icon: <CarIcon className="lg:size-full" />, content: car.state },
    { icon: <LicenseIcon className="ml-1 lg:size-full" />, content: car.licensePlate },
    {
      icon: <HorseIcon className="lg:size-full" />,
      content: car.horsepower ? `${car.horsepower} HP` : null,
    },
    {
      icon: <FuelIcon className="lg:size-full" />,
      content: car.fuelType ? car.fuelType.charAt(0).toUpperCase() + car.fuelType.slice(1) : null,
    },
    {
      icon: <AttentionIcon className="ml-0.5 lg:size-full" />,
      content: car.info ? <span className="font-semibold">{car.info}</span> : null,
    },
  ]

  if (!car || !carType || !carType.name) {
    return null
  }
  return (
    <div className="grid-cols-2 items-center lg:grid lg:px-16 lg:pt-14">
      <div className="mt-4 size-64 scale-130 justify-self-center md:size-72 lg:ml-32 lg:mt-8 lg:size-96 lg:scale-180">
        <img
          src={carType?.imageUrl || '/img/car.png'}
          alt={car.name}
          className="size-full object-cover"
        />
      </div>
      <div className="px-10 tracking-wide lg:ml-32">
        <h2 className="font-lora text-xl font-thin lg:text-3xl lg:font-bold">{car.name}</h2>
        <ul className="mt-7 space-y-2 text-sm md:text-base lg:space-y-4 lg:text-2xl">
          {detailItems
            .filter(
              item =>
                item.content && (typeof item.content === 'string' ? item.content.trim() : true),
            )
            .map((item, index) => (
              <li key={index} className="flex min-w-0 items-center gap-3 lg:items-start">
                <span className="shrink-0 lg:mt-1.5">{item.icon}</span>
                <span className="min-w-0 flex-1">{item.content}</span>
              </li>
            ))}
        </ul>
      </div>
    </div>
  )
}

export default Details
