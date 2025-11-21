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

      const fetchAllData = async () => {
        try {
          const renterIds = [...new Set(bookingsData.map(b => b.renterId))]
          const carIds = [...new Set(bookingsData.map(b => b.carId))]

          const [rentersResponses, carsResponses] = await Promise.all([
            Promise.all(
              renterIds.map(id =>
                axios<UserDto>({
                  url: `${apiUrl}/users/${id}`,
                  headers: { Authorization: `Bearer ${token}` },
                }),
              ),
            ),
            Promise.all(
              carIds.map(id =>
                axios<CarDto>({
                  url: `${apiUrl}/cars/${id}`,
                  headers: { Authorization: `Bearer ${token}` },
                }),
              ),
            ),
          ])

          const ownerIds = [...new Set(carsResponses.map(r => r.data.ownerId))]

          const ownersResponses = await Promise.all(
            ownerIds.map(id =>
              axios<UserDto>({
                url: `${apiUrl}/users/${id}`,
                headers: { Authorization: `Bearer ${token}` },
              }),
            ),
          )

          const rentersMap = new Map(rentersResponses.map(r => [r.data.id, r.data]))
          const carsMap = new Map(carsResponses.map(r => [r.data.id, r.data]))
          const ownersMap = new Map(ownersResponses.map(r => [r.data.id, r.data]))

          const bookingDetails = bookingsData.map(booking => {
            const car = carsMap.get(booking.carId)
            const renter = rentersMap.get(booking.renterId)

            if (!car || !renter) {
              throw new Error('Missing car or renter data')
            }

            const owner = ownersMap.get(car.ownerId)
            if (!owner) {
              throw new Error('Missing owner data')
            }

            return {
              ...booking,
              car: { ...car, owner },
              renter,
            }
          })

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
