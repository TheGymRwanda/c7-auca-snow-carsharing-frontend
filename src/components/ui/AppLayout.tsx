import { Outlet, useLocation } from 'react-router-dom'
import ProtectedRoute from '../ProtectedRoute'
import Header from '../Header'

const publicRoutes = ['/login']

const AppLayout = () => {
  const location = useLocation()
  const isPublicRoute = publicRoutes.includes(location.pathname)

  return (
    <div className="mx-auto max-w-md bg-primary-dark">
      <div className="mx-auto max-w-md fixed top-0 inset-x-0 z-40 w-full">
        <Header />
      </div>
      <main>
        {isPublicRoute ? (
          <Outlet />
        ) : (
          <ProtectedRoute>
            <Outlet />
          </ProtectedRoute>
        )}
      </main>
    </div>
  )
}

export default AppLayout
