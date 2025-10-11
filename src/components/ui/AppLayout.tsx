import { Outlet } from 'react-router-dom'
import Header from '../Header'

const AppLayout = () => (
  <div className="mx-auto max-w-md bg-primary-dark">
    <div className="mx-auto max-w-md fixed top-0 inset-x-0 z-40 w-full">
      <Header />
    </div>
    <main>
      <Outlet />
    </main>
  </div>
)

export default AppLayout
