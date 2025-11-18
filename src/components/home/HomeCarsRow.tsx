import React from 'react'
import { Link } from 'react-router-dom'
import { CarDto, CarTypeDto } from '../../util/api'
import CarCard from '../cars/CarCard'
import CarSkeleton from '../ui/CarSkeleton'

interface HomeCarsRowProps {
  title: string
  cars: CarDto[] | undefined
  carTypes: CarTypeDto[] | undefined
  seeMoreLink?: string
  loading?: boolean
}

const HomeCarsRow: React.FC<HomeCarsRowProps> = ({
  title,
  cars,
  carTypes,
  seeMoreLink,
  loading,
}) => {
  const getCarType = (carTypeId: number) => carTypes?.find(type => type.id === carTypeId)

  if (loading) {
    return (
      <section className="mt-6 rounded-2xl bg-primary-light p-6">
        <div className="flex items-center justify-between">
          <h3 className="font-lora text-xl font-semibold tracking-wide text-white">{title}</h3>
          {seeMoreLink && (
            <Link to={seeMoreLink} className=" text-base font-semibold text-accent">
              See More +
            </Link>
          )}
        </div>

        <div className="transparent-scrollbar mt-4 overflow-x-auto px-4">
          <div className="flex gap-4">
            <CarSkeleton variant="home" count={5} />
          </div>
        </div>
      </section>
    )
  }

  if (!cars || cars.length === 0) {
    return (
      <section className="mt-6">
        <div className="flex items-center justify-between">
          <h3 className="text-3xl font-semibold text-white">{title}</h3>
        </div>
        <div className="mt-4 text-sm text-gray-200">No cars available</div>
      </section>
    )
  }

  return (
    <section className="mt-6 rounded-2xl bg-primary-light p-6">
      <div className="flex items-center justify-between">
        <h3 className="font-lora text-xl font-semibold tracking-wide text-white">{title}</h3>
        {seeMoreLink && (
          <Link to={seeMoreLink} className=" text-base font-semibold text-accent">
            See More +
          </Link>
        )}
      </div>

      <div className="transparent-scrollbar mt-4 overflow-x-auto px-4">
        <div className="flex gap-4">
          {cars.map(car => {
            const carType = getCarType(car.carTypeId)
            return (
              <CarCard
                key={car.id}
                car={car}
                carType={carType}
                buttonText="Book"
                onButtonClick={() => {}}
                variant="home"
              />
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default HomeCarsRow
