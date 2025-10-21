import { configure } from 'axios-hooks'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import NotFound from './pages/NotFound'
import Home from './pages/Home'
import Login from './pages/Login'
import AppLayout from './components/ui/AppLayout'
import CarsListPage from './components/CarsList'
import CarDetails from './pages/CarDetails'
import LandingPage from './pages/LandingPage'

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
          <Route path="car" element={<CarsListPage />} />
          <Route path="car/:id" element={<CarDetails />} />
          <Route path="/login" element={<Login />} />
        </Route>
        <Route path="landing" element={<LandingPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
