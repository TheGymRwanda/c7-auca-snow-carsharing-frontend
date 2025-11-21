import { Outlet, useLocation } from 'react-router-dom'
import ProtectedRoute from '../ProtectedRoute'
import Header from '../Header'
import Sidebar from '../navigation/Sidebar'
import useSidebar from '../../hooks/useSidebar'

const publicRoutes = ['/login', '/landing', '*']

const AppLayout = () => {
  const location = useLocation()
  const isPublicRoute = publicRoutes.includes(location.pathname)
  const { open } = useSidebar()

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-40 mx-auto w-full max-w-md lg:hidden">
        <Header />
      </div>

      {!isPublicRoute && <Sidebar />}

      <main
        className={`bg-primary-dark transition-all ${
          isPublicRoute ? '' : open ? 'lg:ml-64' : 'lg:ml-20'
        }`}
      >
        <div className="mx-auto max-md:max-w-md">
          {isPublicRoute ? (
            <Outlet />
          ) : (
            <ProtectedRoute>
              <Outlet />
            </ProtectedRoute>
          )}
        </div>
      </main>
    </>
  )
}

export default AppLayout
