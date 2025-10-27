import { configure } from 'axios-hooks'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import NotFound from './pages/NotFound'
import Home from './pages/Home'
import Login from './pages/Login'
import AppLayout from './components/ui/AppLayout'
import CarsListPage from './components/CarsList'
import CarDetails from './pages/CarDetails'
import MyCars from './pages/MyCars'
import Profle from './pages/Profile'
import LandingPage from './pages/LandingPage'
import ProtectedRoute from './components/ProtectedRoute'

configure({
  defaultOptions: {
    autoCancel: false,
  },
})

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Home />} />
          <Route path="menu" element={<h1>Menu</h1>} />
          <Route path="bookings" element={<h1>Bookings</h1>} />
          <Route path="car" element={<CarsListPage />} />
          <Route path="my-cars" element={<MyCars />} />
          <Route path="profile" element={<Profle />} />
          <Route path="car/:id" element={<CarDetails />} />
        </Route>
        <Route path="landing" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
