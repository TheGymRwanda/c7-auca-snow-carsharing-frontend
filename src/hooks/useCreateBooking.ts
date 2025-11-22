import useAxios from 'axios-hooks'
import { NewBookingDto } from '../util/api'
import { apiUrl } from '../util/apiUrl'
import { getAuthToken } from '../util/auth'

const useCreateBooking = () => {
  const token = getAuthToken()
  const [{ loading }, executePost] = useAxios(
    {
      url: `${apiUrl}/bookings`,
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
    },
    { manual: true },
  )

  const createBooking = async (bookingData: NewBookingDto) => {
    const response = await executePost({ data: bookingData })
    return response.data
  }

  return { createBooking, loading }
}

export default useCreateBooking
