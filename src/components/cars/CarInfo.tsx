import { CarDto, CarTypeDto } from '../../util/api'
import { CarIcon, ProfileIcon } from '../../assets'

interface CarInfoProps {
  car: CarDto
  carType: CarTypeDto
  ownerName: string
}

function CarInfo({ car, carType, ownerName }: CarInfoProps) {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="overflow-wrap-anywhere mt-2 whitespace-normal font-lora text-xl font-medium leading-tight text-white">
        {car.name}
      </h2>
      <div className="text-14 flex flex-col gap-4 font-normal text-gray-100">
        <div className="flex items-center gap-3">
          <ProfileIcon className="size-7" />
          <span className="lg:text-lg">{ownerName}</span>
        </div>
        <div className="flex items-center gap-3">
          <CarIcon className="size-7" />
          <span className="lg:text-17">{carType?.name || 'Unknown Type'}</span>
        </div>
      </div>
    </div>
  )
}

export default CarInfo
