import { CarIcon, ListIcon, CarsIcon, CarPlusIcon, LogoutIcon, MenuIcon } from '../assets/index'
import { Link } from 'react-router-dom'

export default function DropDown() {
  return (
    <nav className="absolute left-5 top-14 z-40 rounded-md bg-primary-light px-6 pb-2 pt-4 text-sm text-white">
      <div>
        <ul>
          <Link to="/">
            <li className="flex items-center gap-2 p-2 hover:bg-primary-light-hover">
              <CarIcon className="text-white" />
              Book A Car
            </li>
          </Link>
          <Link to="/bookings">
            <li className="flex items-center gap-2 p-2 hover:bg-primary-light-hover">
              <MenuIcon />
              My Bookings
            </li>
          </Link>
        </ul>
        <hr />
        <p className="p-2 text-left font-semibold">My cars</p>
        <ul>
          <Link to="/car">
            <li className="flex items-center gap-2 p-2 hover:bg-primary-light-hover">
              <CarsIcon />
              See My Cars
            </li>
          </Link>
          <Link to="/">
            <li className="flex items-center gap-2 p-2 hover:bg-primary-light-hover">
              <ListIcon />
              My Cars Bookings
            </li>
          </Link>
          <Link to="/">
            <li className="flex items-center gap-2 p-2 hover:bg-primary-light-hover">
              <CarPlusIcon />
              Add New Car
            </li>
          </Link>
        </ul>
        <hr />
        <div
          className="flex items-center gap-2 p-2 hover:bg-primary-light-hover"
          onClick={() => alert('Logging out...')}
        >
          <LogoutIcon />
          <p>Logout</p>
        </div>
      </div>
    </nav>
  )
}
