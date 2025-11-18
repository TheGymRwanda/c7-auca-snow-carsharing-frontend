import PageTitle from '../../components/PageTitle'
import { useCars, useCarTypes } from '../../hooks'
import CarCard from '../../components/cars/CarCard'
import CarSkeleton from '../../components/ui/CarSkeleton'

const AllCars = () => {
  const [{ data: cars, loading }] = useCars()
  const [{ data: carTypes }] = useCarTypes()

  const getCarType = (carTypeId: number) => carTypes?.find(type => type.id === carTypeId)

  return (
    <div className="mt-12">
      <PageTitle title="All CARS" />

      <div className="p-3">
        {loading ? (
          <div className="space-y-3">
            <CarSkeleton count={6} />
          </div>
        ) : (
          cars?.map(car => (
            <CarCard key={car.id} car={car} carType={getCarType(car.carTypeId)} variant="details" />
          ))
        )}
      </div>
    </div>
  )
}

export default AllCars
