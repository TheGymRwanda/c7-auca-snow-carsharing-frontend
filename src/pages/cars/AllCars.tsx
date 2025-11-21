import PageTitle from '../../components/PageTitle'
import { useState } from 'react'
import { useCars, useCarTypes } from '../../hooks'
import CarCard from '../../components/cars/CarCard'
import CarSkeleton from '../../components/ui/CarSkeleton'
import Button from '../../components/ui/Button'

const AllCars = () => {
  const [{ data: cars, loading }] = useCars()
  const [{ data: carTypes }] = useCarTypes()
  const [visibleCars, setVisibleCars] = useState<number>(12)

  const getCarType = (carTypeId: number) => carTypes?.find(type => type.id === carTypeId)
  const carDisplayed = cars?.slice(0, visibleCars)
  const hasMore = cars && cars.length > visibleCars

  return (
    <div className="max-lg:mt-12">
      <PageTitle title="All CARS" />

      <div className="p-3">
        {loading ? (
          <div className="space-y-3">
            <CarSkeleton count={6} />
          </div>
        ) : (
          <>
            <div className="grid px-4 max-md:space-y-6 lg:grid-cols-2 lg:gap-8 lg:px-16 xl:grid-cols-3 xl:gap-6 3xl:grid-cols-4">
              {carDisplayed?.map(car => (
                <CarCard
                  key={car.id}
                  car={car}
                  carType={getCarType(car.carTypeId)}
                  variant="details"
                />
              ))}
            </div>
            {hasMore && (
              <div className="mt-8 grid justify-center text-center">
                <Button
                  text="Load More"
                  isPrimary
                  className="px-14 py-3"
                  onClick={() => setVisibleCars(prev => prev + 12)}
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default AllCars
