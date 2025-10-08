import CarIcon from '../assets/CarIcon'
import ListIcon from '../assets/ListIcon'
import CarsIcon from '../assets/CarsIcon'
import CarPlusIcon from '../assets/CarPlusIcon'
import LogoutIcon from '../assets/LogoutIcon'
import MenuIcon from '../assets/MenuIcon'
import { Link } from 'react-router-dom'

export default function DropDown() {
  return (
    <nav className="absolute left-5 top-14 z-40 rounded-md bg-[#3E7591] p-4 text-sm text-white ">
      <div>
        <ul>
          <Link to="/">
            <li className="flex items-center gap-2 p-2">
              <CarIcon className="text-white" />
              Book A Car
            </li>
          </Link>
          <Link to="/bookings">
            <li className="flex items-center gap-2 p-2">
              <MenuIcon />
              My Bookings
            </li>
          </Link>
        </ul>
        <hr />
        <p className="p-2 text-left font-semibold">My cars</p>
        <ul>
          <Link to="/car">
            <li className="flex items-center gap-2 p-2">
              <CarsIcon />
              See My Cars
            </li>
          </Link>
          <Link to="/">
            <li className="flex items-center gap-2 p-2">
              <ListIcon />
              My Cars Bookings
            </li>
          </Link>
          <Link to="/">
            <li className="flex items-center gap-2 p-2 ">
              <CarPlusIcon />
              Add New Car
            </li>
          </Link>
        </ul>
        <hr />
        <div className="flex items-center gap-2 p-2 py-4 " onClick={() => alert('Logging out...')}>
          <LogoutIcon />
          <p>Logout</p>
        </div>
      </div>
    </nav>
  )
}
