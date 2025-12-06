import { Link } from 'react-router-dom'
import { CarDto, CarTypeDto } from '../../util/api'
import CarInfo from './CarInfo'

interface DetailsVariantProps {
  car: CarDto
  carType: CarTypeDto
  imageSrc: string
  ownerName: string
}

function DetailsVariant({ car, carType, imageSrc, ownerName }: DetailsVariantProps) {
  return (
    <div className="shadow-card mt-8 flex min-h-60 w-full flex-col self-center rounded-2xl bg-primary-light p-4">
      <div className="grid grid-cols-2 gap-20">
        <div className="my-1 flex w-52 items-center justify-center pr-4">
          <img src={imageSrc} alt={`${car.name}'s Picture`} className="max-h-full" />
        </div>
        <div className="flex min-h-52 flex-col justify-around gap-4">
          <CarInfo car={car} carType={carType} ownerName={ownerName} />
          <div className="mb-4 font-semibold">
            <Link to={`/car/${car.id}`} className="text-17 text-accent">
              Show details
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DetailsVariant
