import { Link } from 'react-router-dom'
import { useUser } from '../../hooks'
import { CarDto, CarTypeDto } from '../../util/api'
import { CarIcon, ProfileIcon } from '../../assets'
import ButtonComponent from '../ui/Button'

interface CarCardProps {
  car: CarDto
  carType?: CarTypeDto
  buttonText: string
  primaryButton?: boolean
  buttonVariant?: 'delete' | 'default'
  onButtonClick: () => void
}

function CarCard({
  car,
  carType,
  buttonText,
  primaryButton,
  buttonVariant,
  onButtonClick,
}: CarCardProps) {
  const [{ data: owner, loading, error }] = useUser(car.ownerId)

  const ownerName = loading
    ? 'Loading...'
    : error
    ? 'Unknown Owner'
    : owner?.name || `Owner ${car.ownerId}`
  const imageUrl = (carType?.imageUrl ?? '').trim() || undefined

  return (
    <>
      <div
        key={car.id}
        className="min-h-60 shadow-card mt-8 flex w-full flex-col self-center rounded-2xl bg-primary-light p-4 px-8"
      >
        <div className="grid grid-cols-2 gap-20">
          <div className="my-1 flex w-52 items-center justify-center pr-4">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={`${car.name}'s Picture`}
                className="max-h-full"
              />
            ) : (
              <div className="flex h-40 w-52 items-center justify-center rounded-lg bg-primary/40">
                <CarIcon className="size-10 text-gray-300" />
              </div>
            )}
          </div>
          <div className="min-h-52 flex flex-col justify-around gap-4">
            <div className="flex flex-col gap-4">
              <h2 className="overflow-wrap-anywhere mt-2 whitespace-normal font-lora text-xl leading-tight text-white">
                {car.name}
              </h2>
              <div className="flex flex-col gap-4 text-18 font-light text-gray-100">
                <div className="flex items-center gap-3">
                  <ProfileIcon className="size-7" />
                  <span>{ownerName}</span>
                </div>
                <div className="flex items-center gap-3">
                  <CarIcon className="size-7" />
                  <span>{carType?.name || 'Unknown Type'}</span>
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
          <ButtonComponent
            text={buttonText}
            isPrimary={primaryButton ? true : false}
            className={`shadow-button text-17 drop-shadow-2xl`}
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
