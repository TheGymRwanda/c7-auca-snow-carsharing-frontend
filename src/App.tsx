import { ReactElement } from 'react'
import { configure } from 'axios-hooks'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import NotFound from './components/NotFound'
import AppLayout from './ui/AppLayout'

// Configure axios hooks
// Do not delete this if you want to use the provided API hooks in `src/hooks`
configure({
  defaultOptions: {
    autoCancel: false,
  },
})

function App(): ReactElement {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<h1>Home</h1>} />
          <Route path="menu" element={<h1>Menu</h1>} />
          <Route path="bookings" element={<h1>Bookings</h1>} />
          <Route path="car" element={<h1>All cars</h1>} />
          <Route path="car/:id" element={<h1>Car details</h1>} />
        </Route>
        <Route path="/login" element={<h1>Login</h1>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
