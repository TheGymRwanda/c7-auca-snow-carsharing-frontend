import { configure } from 'axios-hooks'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import NotFound from './pages/NotFound'
import Home from './pages/Home'
import Login from './pages/Login'
import AppLayout from './components/layouts/AppLayout'
import AvailableCars from './pages/AvailableCars'
import CarDetails from './pages/CarDetails'
import MyCars from './pages/MyCars'
import Profile from './pages/Profile'
import AddNewCar from './pages/addNewCar'
import ManageBooking from './pages/ManageBooking'
import LandingPage from './pages/Landing'

configure({
  defaultOptions: {
    autoCancel: false,
  },
})

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="menu" element={<h1>Menu</h1>} />
          <Route path="bookings" element={<h1>Bookings</h1>} />
          <Route path="booking/management" element={<ManageBooking />} />
          <Route path="add-new-car" element={<AddNewCar />} />
          <Route path="car" element={<AvailableCars />} />
          <Route path="my-cars" element={<MyCars />} />
          <Route path="profile" element={<Profile />} />
          <Route path="car/:id" element={<CarDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
          <Route path="landing" element={<LandingPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
