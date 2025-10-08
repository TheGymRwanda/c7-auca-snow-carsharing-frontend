import { Outlet } from 'react-router-dom'
import Header from '../components/Header'

const AppLayout = () => (
  <div className="bg-[#265E78]">
    <Header />
    <Outlet />
  </div>
)

export default AppLayout
