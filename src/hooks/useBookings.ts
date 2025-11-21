import axios from 'axios'
import useAxios from 'axios-hooks'
import { useEffect, useState } from 'react'
import { BookingDto, BookingWithReferences, CarDto, UserDto } from '../util/api'
import { apiUrl } from '../util/apiUrl'
import { getAuthToken } from '../util/auth'

function useBookingData() {
  const [data, setData] = useState<BookingWithReferences[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<unknown>(null)
  const token = getAuthToken()

  const [{ data: bookingsData, loading: bookingsLoading, error: bookingsError }, refetchBookings] =
    useAxios<BookingDto[]>({
      url: `${apiUrl}/bookings`,
      headers: { Authorization: `Bearer ${token}` },
    })

  useEffect(() => {
    if (bookingsData) {
      setLoading(true)
      setError(null)

      const fetchCarAndUser = async (booking: BookingDto) => {
        const [renterResponse, carResponse] = await Promise.all([
          axios<UserDto>({
            url: `${apiUrl}/users/${booking.renterId}`,
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios<CarDto>({
            url: `${apiUrl}/cars/${booking.carId}`,
            headers: { Authorization: `Bearer ${token}` },
          }),
        ])

        const ownerResponse = await axios<UserDto>({
          url: `${apiUrl}/users/${carResponse.data.ownerId}`,
          headers: { Authorization: `Bearer ${token}` },
        })

        return {
          ...booking,
          car: {
            ...carResponse.data,
            owner: ownerResponse.data,
          },
          renter: renterResponse.data,
        }
      }

      const fetchAllData = async () => {
        try {
          const bookingPromises = bookingsData.map(fetchCarAndUser)
          const bookingDetails = await Promise.all(bookingPromises)
          setData(bookingDetails)
          setLoading(false)
        } catch (err) {
          setError(err)
          setLoading(false)
        }
      }

      fetchAllData()
    } else if (bookingsError) {
      setError(bookingsError)
      setLoading(false)
    }
  }, [bookingsData, bookingsError])

  const isLoading = bookingsLoading || loading

  const refetch = () => {
    refetchBookings()
  }

  return { data, loading: isLoading, error, refetch }
}

export default useBookingData
