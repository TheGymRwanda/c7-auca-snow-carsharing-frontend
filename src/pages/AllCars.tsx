import React from 'react'
import PageTitle from '../components/PageTitle'
import { Link } from 'react-router-dom'
import { CarIcon, ProfileIcon } from '../assets'
import { useCars, useCarTypes, useUser } from '../hooks'
import CarDetailsCard from '../components/cars/CarDetailsCard'

const AllCars = () => {
  const [{ data: cars, loading, error }, refetch] = useCars()
  const [{ data: carTypes }] = useCarTypes()

  const getCarType = (carTypeId: number) => carTypes?.find(type => type.id === carTypeId)

  return (
    <div className="mt-12">
      <PageTitle title="All CARS" />

      <div className="p-3">
        {cars?.map(car => (
          <CarDetailsCard car={car} key={car.id} carType={getCarType(car.carTypeId)} />
        ))}
      </div>
    </div>
  )
}

export default AllCars
