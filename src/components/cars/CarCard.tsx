import { Link } from 'react-router-dom'
import { useSidebar, useUser } from '../../hooks'
import { CarDto, CarTypeDto } from '../../util/api'
import { CarIcon, ProfileIcon } from '../../assets'
import Button from '../ui/Button'
import { useAuth } from '../../context/AuthContext'

interface CarCardProps {
  car: CarDto
  carType?: CarTypeDto
  buttonText?: string
  primaryButton?: boolean
  buttonVariant?: 'delete' | 'default'
  onButtonClick?: () => void
  variant?: 'home' | 'default' | 'details'
}

function getOwnerName(owner: unknown, loading: boolean, error: unknown, ownerId: number) {
  return loading
    ? 'Loading...'
    : error
    ? 'Unknown Owner'
    : (owner as { name?: string })?.name || `Owner ${ownerId}`
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

  const imageUrl = (carType?.imageUrl ?? '').trim()
  const imageSrc = imageUrl || '/images/car.png'

  if (!car || !carType || !carType.name) {
    return null
  }

  if (variant === 'home') {
    return (
      <div className="w-70 shrink-0 rounded-2xl bg-primary-dark p-6">
        <div className="mb-4 flex items-center justify-center">
          <img
            src={imageSrc}
            alt={`${car.name} picture`}
            className="h-24 scale-200 object-contain"
          />
        </div>
        <h3 className="text-xl font-medium text-white">{car.name}</h3>
        <Link to={`/car/${car.id}`} className="font-medium text-accent">
          Show details
        </Link>
        <div className="mt-2 text-xs">
          {ownerName !== user?.name && <Button text="Book Now" isPrimary />}
        </div>
      </div>
    )
  }

  if (variant === 'details') {
    return (
      <div className="min-h-60 shadow-card mt-8 flex w-full flex-col self-center rounded-2xl bg-primary-light px-4 py-4">
        <div className="grid grid-cols-2 gap-20">
          <div className="my-1 flex w-52 items-center justify-center pr-4">
            <img src={carType?.imageUrl} alt={`${car.name}'s Picture`} className="max-h-full" />
          </div>
          <div className="min-h-52 flex flex-col justify-around gap-4">
            <div className="flex flex-col gap-4">
              <h2 className="overflow-wrap-anywhere mt-2 whitespace-normal font-lora text-xl font-medium leading-tight text-white">
                {car.name}
              </h2>
              <div className="text-14 flex flex-col gap-4 font-normal text-gray-100">
                <div className="flex items-center gap-3">
                  <ProfileIcon className="size-7" />
                  <span>{owner?.name || 'Unknown'}</span>
                </div>
                <div className="flex items-center gap-3">
                  <CarIcon className="size-7" />
                  <span>{carType?.name || 'Unkown type'}</span>
                </div>
              </div>
            </div>
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

  return (
    <>
      <div
        key={car.id}
        className="min-h-60 shadow-card mt-8 flex w-full flex-col self-center rounded-2xl bg-primary-light px-8 py-4 transition-all duration-500 ease-in-out lg:hover:scale-105"
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
            isPrimary={primaryButton ? true : false}
            className={`shadow-button py-3 text-17 drop-shadow-2xl`}
            variant={buttonVariant}
            loading={loading}
            onClick={onButtonClick}
          />
        </div>
      </div>
    </>
  )
}

export default CarCard
