import { configure } from 'axios-hooks'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import NotFound from './pages/NotFound'
import Home from './pages/Home'
import Login from './pages/Login'
import AppLayout from './components/ui/AppLayout'
import ProtectedRoute from './components/ProtectedRoute'
import CarsListPage from './components/CarsList'
import CarDetails from './pages/CarDetails'

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
          <Route index element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="menu" element={<ProtectedRoute><h1>Menu</h1></ProtectedRoute>} />
          <Route path="bookings" element={<ProtectedRoute><h1>Bookings</h1></ProtectedRoute>} />
          <Route path="car" element={<ProtectedRoute><CarsListPage /></ProtectedRoute>} />
          <Route path="car/:id" element={<ProtectedRoute><CarDetails /></ProtectedRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
