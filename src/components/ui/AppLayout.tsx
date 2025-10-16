import { Outlet } from 'react-router-dom'
import Header from '../Header'

const AppLayout = () => (
  <div className="mx-auto max-w-md bg-primary-dark">
    <div className="fixed inset-x-0 top-0 z-40 mx-auto w-full max-w-md">
      <Header />
    </div>
    <main>
      <Outlet />
    </main>
  </div>
)

export default AppLayout
