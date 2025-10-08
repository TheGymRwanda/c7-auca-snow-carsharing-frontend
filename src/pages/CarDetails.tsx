import { ChevronBackIcon } from '../assets/ChevronBackIcon'
import CarIcon from '../assets/CarIcon'
import HorseIcon from '../assets/HorseIcon'
import FuelIcon from '../assets/FuelIcon'
import XIcon from '../assets/XIcon'
import ProfileIcon from '../assets/ProfileIcon'

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

// eslint-disable-next-line arrow-body-style
const CarDetails = () => {
  
  return (
    <div className="mt-10 h-screen space-y-11 text-[#F9FAFB]">
      <div className="flex items-center justify-between pl-5  pt-5 text-2xl md:text-5xl">
        <ChevronBackIcon className="text-[#F8FCAD]" />
        <h1 className="font-bold">Details</h1>
        <p></p>
      </div>
      <div className="items-center  gap-32 space-y-11 pl-11 sm:flex lg:gap-64">
        <img src="../../public/img/car.png" className="w-[80%] sm:w-[40%]" />
        <div>
          <h2 className="text-xl font-medium md:text-3xl">Tini Titan</h2>
          <ul className="text-md mt-7 space-y-2 md:text-xl">
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
