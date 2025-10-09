import { Outlet } from 'react-router-dom'
import Header from '../components/Header'

const AppLayout = () => (
  <div className="bg-[#265E78]">
    <div className="fixed top-0 z-40 w-full">
      <Header />
    </div>
    <main>
      <Outlet />
    </main>
  </div>
)

export default AppLayout
