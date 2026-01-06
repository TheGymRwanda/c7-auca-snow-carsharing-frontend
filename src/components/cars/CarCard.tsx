import { Link, useNavigate } from 'react-router-dom'
import { useSidebar, useUser } from '../../hooks'
import { CarDto, CarTypeDto } from '../../util/api'
import Button from '../ui/Button'
import { useAuth } from '../../context/AuthContext'
import CarInfo from './CarInfo'
import HomeVariant from './HomeVariant'
import DetailsVariant from './DetailsVariant'
import getOwnerName from '../../util/utils'

interface CarCardProps {
  car: CarDto
  carType?: CarTypeDto
  buttonText?: string
  primaryButton?: boolean
  buttonVariant?: 'delete' | 'default'
  onButtonClick?: () => void
  variant?: 'home' | 'default' | 'details'
}

function CarCard({
  car,
  carType,
  buttonText,
  primaryButton,
  buttonVariant,
  onButtonClick,
  variant = 'default',
}: CarCardProps) {
  const [{ data: owner, loading, error }] = useUser(car.ownerId)
  const ownerName = getOwnerName(owner, loading, error, car.ownerId)
  const { user } = useAuth()
  const { open } = useSidebar()
  const navigate = useNavigate()
  const imageUrl = (carType?.imageUrl ?? '').trim()
  const imageSrc = imageUrl || '/images/car.png'

  if (!car || !carType || !carType.name) return null

  if (variant === 'home') {
    return (
      <HomeVariant
        car={car}
        carType={carType}
        imageSrc={imageSrc}
        ownerName={ownerName}
        user={user}
        onNavigate={() => navigate('/book-car')}
      />
    )
  }

  if (variant === 'details') {
    return <DetailsVariant car={car} carType={carType} imageSrc={imageSrc} ownerName={ownerName} />
  }

  return (
    <div
      key={car.id}
      className="shadow-card mt-8 flex min-h-60 w-full flex-col self-center rounded-2xl bg-primary-light px-8 py-4 transition-all duration-500 ease-in-out lg:hover:scale-105"
    >
      <div className="grid grid-cols-2 gap-20">
        <div className="my-1 flex w-52 items-center justify-center pr-4 max-md:-ml-4">
          <img
            src={imageSrc}
            alt={`${car.name}'s Picture`}
            className={`max-h-full ${
              open ? '' : 'lg:scale-115'
            } transition-all duration-500 ease-in-out`}
          />
        </div>
        <div className="flex min-h-52 flex-col justify-around gap-y-8">
          <CarInfo car={car} carType={carType} ownerName={ownerName} />
          <div className="mb-4 font-semibold">
            <Link to={`/car/${car.id}`} className="text-17 text-accent">
              Show details
            </Link>
          </div>
        </div>
      </div>
      <div className="text-center">
        <Button
          text={buttonText}
          isPrimary={!!primaryButton}
          className="shadow-button py-3 text-17 drop-shadow-2xl"
          variant={buttonVariant}
          loading={loading}
          onClick={onButtonClick}
        />
      </div>
    </div>
  )
}

export default CarCard
