import useUser from '../hooks/useUser'
import ShowCarComponent from '../ui/ShowCarComponent'
import { CarDto, CarTypeDto } from '../util/api'

type CarCardProps = {
  car: CarDto
  carType?: CarTypeDto
}

export default function CarCard({ car, carType }: CarCardProps) {
  const [{ data: owner, loading, error }] = useUser(car.ownerId)

  if (loading) {
    return <div className="text-white">Loading owner...</div>
  }

  if (error) {
    return <div className="text-red-400">Failed to load owner</div>
  }

  return (
    <ShowCarComponent
      key={car.id}
      index={car.id}
      title={car.name}
      image={carType?.imageUrl || ''}
      owner={owner ? owner.name : `Owner ${car.ownerId}`}
      location={carType?.name || 'Unknown Type'}
    />
  )
}
