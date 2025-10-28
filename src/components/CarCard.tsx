import useUser from '../hooks/useUser'
import CarDetails from './ui/CarDetails'
import { CarDto, CarTypeDto } from '../util/api'

interface CarCardProps {
  car: CarDto
  carType?: CarTypeDto
}

function CarCard({ car, carType }: CarCardProps) {
  const [{ data: owner, loading, error }] = useUser(car.ownerId)

  const ownerName = loading
    ? 'Loading...'
    : error
    ? 'Unknown Owner'
    : owner?.name || `Owner ${car.ownerId}`

  return (
    <CarDetails
      key={car.id}
      index={car.id}
      title={car.name}
      image={carType?.imageUrl || ''}
      owner={ownerName}
      location={carType?.name || 'Unknown Type'}
    />
  )
}

export default CarCard
