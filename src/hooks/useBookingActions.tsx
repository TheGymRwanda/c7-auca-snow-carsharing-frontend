import { useState } from 'react'
import { BookingState, CarState } from '../util/api'
import { apiUrl } from '../util/apiUrl'
import axios, { getErrorMessage } from '../util/apiClient'
import { getAuthToken } from '../util/auth'

interface ModalState {
  isOpen: boolean
  text: string
  title: string
}

export function useBookingActions(bookingId: number, carId: number) {
  const [modalState, setModalState] = useState<ModalState>({
    isOpen: false,
    text: '',
    title: '',
  })
  const [bookingState, setBookingState] = useState<BookingState | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const token = getAuthToken()

  const showModal = (title: string, text: string) => {
    setModalState({ isOpen: true, title, text })
  }

  const closeModal = () => {
    setModalState(prev => ({ ...prev, isOpen: false }))
  }

  const handleBookingAction = (action: 'PICK_UP' | 'RETURN') => {
    const state = action === 'PICK_UP' ? BookingState.PICKED_UP : BookingState.RETURNED
    setIsLoading(true)
    axios
      .patch(
        `${apiUrl}/bookings/${bookingId}`,
        { state },
        { headers: { Authorization: `Bearer ${token}` } },
      )
      .then(() => {
        setBookingState(state)
        const text =
          action === 'PICK_UP' ? 'Car picked up successfully' : 'Car returned successfully'
        showModal('Success', text)
      })
      .catch(error => showModal('Error', getErrorMessage(error)))
      .finally(() => setIsLoading(false))
  }

  const handleCarAction = (action: 'LOCK' | 'UNLOCK') => {
    const state = action === 'LOCK' ? CarState.LOCKED : CarState.UNLOCKED
    setIsLoading(true)
    axios
      .patch(
        `${apiUrl}/cars/${carId}`,
        { state },
        { headers: { Authorization: `Bearer ${token}` } },
      )
      .then(() => {
        const text = action === 'LOCK' ? 'Car locked successfully' : 'Car unlocked successfully'
        showModal('Success', text)
      })
      .catch(error => showModal('Error', getErrorMessage(error)))
      .finally(() => setIsLoading(false))
  }

  return {
    modalState,
    closeModal,
    bookingState,
    setBookingState,
    isLoading,
    handleBookingAction,
    handleCarAction,
  }
}
