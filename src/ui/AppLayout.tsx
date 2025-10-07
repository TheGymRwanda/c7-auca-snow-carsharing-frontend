import { Outlet } from 'react-router-dom'
import Header from '../components/Header'

const AppLayout = () => (
  <div>
    <div className="fixed top-0 w-full">
      <Header />
    </div>
    <main>
      <Outlet />
    </main>
  </div>
)

export default AppLayout
