import { CarIcon, ListIcon, CarsIcon, CarPlusIcon, LogoutIcon, MenuIcon } from '../../assets/index'
import { useAuth } from '../../context/AuthContext'
import Nav from './Nav'

const mainNavItems = [
  { to: '/book-car', icon: <CarIcon className="text-white" />, label: 'Book A Car' },
  { to: '/bookings', icon: <MenuIcon />, label: 'My Bookings' },
]

const carNavItems = [
  { to: '/my-cars', icon: <CarsIcon />, label: 'See My Cars' },
  { to: '/booking/management', icon: <ListIcon />, label: 'My Cars Bookings' },
  { to: '/add-new-car', icon: <CarPlusIcon />, label: 'Add New Car' },
]

function DropDown() {
  const { logout } = useAuth()

  return (
    <nav className="absolute left-4 top-14 z-40 w-52 rounded-md bg-primary-light px-4 pb-2 pt-4 text-sm text-white">
      <div>
        <ul>
          {mainNavItems.map(item => (
            <li key={item.to}>
              <Nav {...item} open={true} variant="dropdown" />
            </li>
          ))}
        </ul>
        <hr />
        <p className="p-2 text-left font-semibold">My cars</p>
        <ul>
          {carNavItems.map(item => (
            <li key={item.to}>
              <Nav {...item} open={true} variant="dropdown" />
            </li>
          ))}
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
