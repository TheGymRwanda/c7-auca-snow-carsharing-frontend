import { useNavigate } from 'react-router-dom'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import type { Dayjs } from 'dayjs'
import { useState } from 'react'
import BookCarForm from '../components/forms/BookCar'

const BookCar = () => {
  const [startDate, setStartDate] = useState<Dayjs | null>(null)
  const [endDate, setEndDate] = useState<Dayjs | null>(null)
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    e.preventDefault()
    if (!startDate || !endDate) return alert('Choose both start and end dates')
    if (!endDate.isAfter(startDate)) return alert('End must be after start')
    navigate('/cars', {
      state: { start: startDate.toISOString(), end: endDate.toISOString() },
    })
  }
  return (
    <div className="mt-24 flex flex-col">
      <div className="px-6 text-white">
        <h1 className="text-center font-lora text-3xl mb-20">BOOK CAR</h1>

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
    </div>
  )
}
export default BookCar
