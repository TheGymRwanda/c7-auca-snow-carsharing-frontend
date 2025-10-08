import React from 'react'
import { ChevronBackIcon } from '../assets/ChevronBackIcon'
import ProfileIcon from '../assets/ProfileIcon'
import CarPlusIcon from '../assets/CarPlusIcon'
import CarsIcon from '../assets/CarsIcon'
import CarIcon from '../assets/CarIcon'
import HorseIcon from '../assets/HorseIcon'
import FuelIcon from '../assets/FuelIcon'
import ErrorIcon from '../assets/ErrorIcon'
import XIcon from '../assets/XIcon'
import UnlockIcon from '../assets/UnlockIcon'
import PenIcon from '../assets/PenIcon'

const car = [
  {
    id: 2,
    carTypeId: 3,
    name: "Izzi's Car",
    ownerId: 3,
    state: 'LOCKED',
    fuelType: 'petrol',
    horsepower: 125,
    licensePlate: 'FOO-BAR 42',
    info: 'Please no scratches!',
  },
  {
    id: 4,
    carTypeId: 1,
    name: 'Test',
    ownerId: 1,
    state: 'LOCKED',
    fuelType: 'diesel',
    horsepower: 230,
    licensePlate: 'RAB 239 D',
    info: 'Ev Car',
  },
  {
    id: 1,
    carTypeId: 1,
    name: "Bea's Car",
    ownerId: 1,
    state: 'LOCKED',
    fuelType: 'electric',
    horsepower: 250,
    licensePlate: null,
    info: null,
  },
][0]

const CarDetails = () => {
  console.log(car)
  return (
    <div className="text-[#F9FAFB] h-screen mt-10 space-y-11">
      <div className="text-2xl pl-5 flex  items-center justify-between md:text-5xl">
        <ChevronBackIcon className="text-[#F8FCAD]" />
        <h1 className="font-bold">Details</h1>
        <p></p>
      </div>
      <div className="pl-11  space-y-11 items-center sm:flex gap-32 lg:gap-64">
        <img src="../../public/img/car.png" className="w-[80%] sm:w-[40%]" />
        <div>
          <h2 className="text-xl md:text-3xl font-medium">Tini Titan</h2>
          <ul className="space-y-2 mt-7 text-md md:text-xl">
            <li className="flex items-center gap-2">
              <ProfileIcon /> {car.name}
            </li>
            <li className="flex items-center gap-2">
              <CarIcon /> {car.state}
            </li>
            <li className="flex items-center gap-2">
              <CarIcon /> {car.licensePlate || 'No license plate'}
            </li>
            <li className="flex items-center gap-2">
              <HorseIcon /> {car.horsepower}
            </li>
            <li className="flex items-center gap-2">
              <FuelIcon /> {car.fuelType}
            </li>
            <li className="flex items-center gap-2">
              <XIcon /> {car.info}
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default CarDetails
