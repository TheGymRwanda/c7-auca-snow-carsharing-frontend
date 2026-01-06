import { Link } from 'react-router-dom'
import { CarDto, CarTypeDto, UserDto } from '../../util/api'
import Button from '../ui/Button'

interface HomeVariantProps {
  car: CarDto
  carType: CarTypeDto
  imageSrc: string
  ownerName: string
  user: UserDto | null | undefined
  onNavigate: () => void
}

function HomeVariant({ car, imageSrc, ownerName, user, onNavigate }: HomeVariantProps) {
  return (
    <div className="w-70 shrink-0 rounded-2xl bg-primary-dark p-6">
      <div className="mb-4 flex items-center justify-center">
        <img src={imageSrc} alt={`${car.name} picture`} className="h-24 scale-200 object-contain" />
      </div>
      <h3 className="text-xl font-medium text-white">{car.name}</h3>
      <Link to={`/car/${car.id}`} className="font-medium text-accent">
        Show details
      </Link>
      <div className="mt-2 text-xs">
        {ownerName !== user?.name && <Button text="Book Now" isPrimary onClick={onNavigate} />}
      </div>
    </div>
  )
}

export default HomeVariant
