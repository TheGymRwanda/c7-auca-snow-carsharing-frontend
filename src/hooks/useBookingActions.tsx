import axios from 'axios'
import { useState } from 'react'
import { BookingState, CarState } from '../util/api'
import { apiUrl } from '../util/apiUrl'

type ModalState = {
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

  const showModal = (title: string, text: string) => {
    setModalState({ isOpen: true, title, text })
  }

  const closeModal = () => {
    setModalState(prev => ({ ...prev, isOpen: false }))
  }

  const handleBookingAction = (action: 'PICK_UP' | 'RETURN') => {
    const state = action === 'PICK_UP' ? BookingState.PICKED_UP : BookingState.RETURNED
    axios
      .patch(`${apiUrl}/bookings/${bookingId}`, { state })
      .then(() => {
        setBookingState(state)
        const text =
          action === 'PICK_UP' ? 'Car picked up successfully' : 'Car returned successfully'
        showModal('Success', text)
      })
      .catch(error => showModal('Error', error.message))
  }

  const handleCarAction = (action: 'LOCK' | 'UNLOCK') => {
    const state = action === 'LOCK' ? CarState.LOCKED : CarState.UNLOCKED
    axios
      .patch(`${apiUrl}/cars/${carId}`, { state })
      .then(() => {
        const text = action === 'LOCK' ? 'Car locked successfully' : 'Car unlocked successfully'
        showModal('Success', text)
      })
      .catch(error => showModal('Error', error.message))
  }

  return {
    modalState,
    closeModal,
    bookingState,
    setBookingState,
    handleBookingAction,
    handleCarAction,
  }
}
