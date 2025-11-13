import React from 'react'
import PageTitle from '../components/PageTitle'
import { useCars, useCarTypes } from '../hooks'
import CarDetailsCard from '../components/cars/CarDetailsCard'
import LoaderComponent from '../components/ui/Loader'

const AllCars = () => {
  const [{ data: cars, loading, error }, refetch] = useCars()
  const [{ data: carTypes }] = useCarTypes()

  const getCarType = (carTypeId: number) => carTypes?.find(type => type.id === carTypeId)

  return (
    <div className="mt-12">
      <PageTitle title="All CARS" />

      <div className="p-3">
        {loading ? (
          <LoaderComponent />
        ) : (
          cars?.map(car => (
            <CarDetailsCard key={car.id} car={car} carType={getCarType(car.carTypeId)} />
          ))
        )}
      </div>
    </div>
  )
}

export default AllCars
