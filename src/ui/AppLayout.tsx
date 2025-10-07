import { Outlet } from 'react-router-dom'
import Header from '../components/Header'

const AppLayout = () => (
  <div>
    <Header />
    <Outlet />
  </div>
)

export default AppLayout
