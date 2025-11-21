import { CarIcon, ListIcon, CarsIcon, CarPlusIcon, LogoutIcon, MenuIcon } from '../../assets/index'
import { useAuth } from '../../context/AuthContext'
import Nav from './Nav'

function DropDown() {
  const { logout } = useAuth()

  return (
    <nav className="absolute left-4 top-14 z-40 w-52 rounded-md bg-primary-light px-4 pb-2 pt-4 text-sm text-white">
      <div>
        <ul>
          <Nav
            to="/book-car"
            icon={<CarIcon className="text-white" />}
            label="Book A Car"
            open={true}
            variant="dropdown"
          />
          <Nav
            to="/bookings"
            icon={<MenuIcon />}
            label="My Bookings"
            open={true}
            variant="dropdown"
          />
        </ul>
        <hr />
        <p className="p-2 text-left font-semibold">My cars</p>
        <ul>
          <Nav
            to="/my-cars"
            icon={<CarsIcon />}
            label="See My Cars"
            open={true}
            variant="dropdown"
          />
          <Nav
            to="/booking/management"
            icon={<ListIcon />}
            label="My Cars Bookings"
            open={true}
            variant="dropdown"
          />
          <Nav
            to="/add-new-car"
            icon={<CarPlusIcon />}
            label="Add New Car"
            open={true}
            variant="dropdown"
          />
        </ul>
        <hr />
        <div className="flex items-center gap-2 p-2 hover:bg-primary-light-hover" onClick={logout}>
          <LogoutIcon />
          <p>Logout</p>
        </div>
      </div>
    </nav>
  )
}

export default DropDown
