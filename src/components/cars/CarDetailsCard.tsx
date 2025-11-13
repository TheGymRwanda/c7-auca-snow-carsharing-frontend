import React from 'react'
import { Link } from 'react-router-dom'
import { CarDto, CarTypeDto } from '../../util/api'
import { CarIcon, ProfileIcon } from '../../assets'
import { useUser } from '../../hooks'

interface CarCardProps {
  car: any
  carType?: CarTypeDto
}

const CarDetailsCard = ({ car, carType }: CarCardProps) => {
  const [{ data: owner, loading, error }] = useUser(car.ownerId)

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

export default CarDetailsCard
