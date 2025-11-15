import { Link } from 'react-router-dom'
import { CarIcon, MenuIcon, CarsIcon, CarPlusIcon, LogoutIcon, ListIcon, Logo } from '../../assets'
import useSidebar from '../../hooks/useSidebar'
import { useAuth } from '../../context/AuthContext'
import Nav from './Nav'

const Sidebar = () => {
  const { open, setOpen } = useSidebar()
  const { logout } = useAuth()

  return (
    <aside
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      className={`duration-400 fixed left-0 top-0 z-40 hidden h-screen flex-col overflow-hidden rounded-r-3xl bg-nav text-white transition-all lg:flex ${
        open ? 'w-64' : 'w-20'
      }`}
    >
      <div className="flex items-center justify-center gap-2 px-6 2xl:py-6">
        {open && <span className="border-b border-white/30 pb-2 font-lora text-2xl">MONI</span>}
        <Link to="/" className="flex items-center gap-3 pt-6 lg:gap-4">
          <div
            className={`rounded-full border-b-2 border-white/30 px-3 py-6 ${open ? 'bg-nav' : ''}`}
          >
            <Logo />
          </div>
        </Link>
        {open && <span className="border-b border-white/30 pb-2 font-lora text-2xl">Share</span>}
      </div>

      <nav className="mt-screen-10 flex flex-1 flex-col justify-between">
        <ul className="space-y-2 px-2">
          <Nav to="/car" icon={<CarIcon />} label="Book A Car" open={open} />
          <Nav to="/bookings" icon={<MenuIcon />} label="My Bookings" open={open} />
          <Nav to="/my-cars" icon={<CarsIcon />} label="See My Cars" open={open} />
          <Nav to="/" icon={<ListIcon />} label="My Cars Bookings" open={open} />
          <Nav to="/add-new-car" icon={<CarPlusIcon />} label="Add New Car" open={open} />
        </ul>

        <div className="mb-6 px-2">
          <button
            onClick={logout}
            className="flex w-full items-center gap-4 truncate border-t border-white/30 px-3 py-2 text-left hover:bg-primary-light-hover/20"
          >
            <div className={`flex-none p-1 ${open ? 'mr-2' : 'mx-auto'}`}>
              <LogoutIcon />
            </div>
            {open && <span>Log Out</span>}
          </button>
        </div>
      </nav>
    </aside>
  )
}

export default Sidebar
