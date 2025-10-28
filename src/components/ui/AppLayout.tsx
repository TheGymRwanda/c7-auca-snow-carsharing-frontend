import { Outlet, useLocation } from 'react-router-dom'
import ProtectedRoute from '../ProtectedRoute'
import Header from '../Header'

const publicRoutes = ['/login', '/landing', '*']

const AppLayout = () => {
  const location = useLocation()
  const isPublicRoute = publicRoutes.includes(location.pathname)

  return (
    <div className="mx-auto max-md:max-w-md bg-primary">
      <div className="fixed inset-x-0 top-0 z-40 mx-auto w-full max-w-md">
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
