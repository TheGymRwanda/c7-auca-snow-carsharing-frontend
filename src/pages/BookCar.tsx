import { useNavigate } from 'react-router-dom'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import type { Dayjs } from 'dayjs'
import { useState } from 'react'
import BookCarForm from '../components/forms/BookCar'
import PageTitle from '../components/PageTitle'
import Patterns from '../components/ui/Patterns'

const BookCar = () => {
  const [startDate, setStartDate] = useState<Dayjs | null>(null)
  const [endDate, setEndDate] = useState<Dayjs | null>(null)
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    e.preventDefault()
    if (!startDate || !endDate) return alert('Choose both start and end dates')
    if (!endDate.isAfter(startDate)) return alert('End must be after start')
    navigate('/available-cars', {
      state: { start: startDate.toISOString(), end: endDate.toISOString() },
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
    </div>
  )
}
export default BookCar
