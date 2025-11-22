import { useNavigate } from 'react-router-dom'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import type { Dayjs } from 'dayjs'
import { useState } from 'react'
import BookCarForm from '../components/forms/BookCar'
import PageTitle from '../components/PageTitle'
import Patterns from '../components/ui/Patterns'
import { toast, ToastContainer } from 'react-toastify'

const BookCar = () => {
  const [startDate, setStartDate] = useState<Dayjs | null>(null)
  const [endDate, setEndDate] = useState<Dayjs | null>(null)
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!startDate || !endDate) {
      toast.error('Choose both start and end dates')
      return null
    }
    if (!endDate.isAfter(startDate)) {
      toast.error('End must be after start')
      return null
    }
    navigate('/available-cars', {
      state: {
        start: startDate.toDate().toISOString(),
        end: endDate.toDate().toISOString(),
      },
    })
  }
  return (
    <div className=" relative flex h-screen flex-col overflow-hidden">
      <Patterns />
      <PageTitle title="Book Car" />
      <div className="px-6 text-white max-lg:mt-28 lg:-mt-screen-10 lg:grid lg:h-screen lg:items-center">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <BookCarForm
            startDate={startDate}
            endDate={endDate}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
            handleSubmit={handleSubmit}
          />
        </LocalizationProvider>
      </div>
      <ToastContainer position="top-right" />
    </div>
  )
}
export default BookCar
