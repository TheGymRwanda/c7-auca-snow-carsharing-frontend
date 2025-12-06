import axios from 'axios'
import { useState } from 'react'
import { BookingState } from '../../util/api'
import { apiUrl } from '../../util/apiUrl'
import { getAuthToken } from '../../util/auth'
import { formatBookingStatus } from '../../util/booking'
import Button from '../ui/Button'
import ConfirmModal from '../ui/ConfirmModal'

interface ManageBookingActionsProps {
  bookingId: number
  state: BookingState
  onUpdate?: () => void
}

function ManageBookingActions({ bookingId, state, onUpdate }: ManageBookingActionsProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalText, setModalText] = useState('')
  const [modalTitle, setModalTitle] = useState('')
  const [pendingAction, setPendingAction] = useState<(() => void) | null>(null)
  const [text, setText] = useState('')
  const token = getAuthToken()

  const handleClick = (action: 'A' | 'D') => {
    const actionText = action === 'A' ? 'accept' : 'decline'
    setText(actionText)
    setModalTitle(`Confirm ${actionText}`)
    setModalText(`Are you sure you want to ${actionText} this booking?`)
    setPendingAction(() => () => executeAction(action))
    setIsModalOpen(true)
  }

  const executeAction = (action: 'A' | 'D') => {
    const newState = action === 'A' ? BookingState.ACCEPTED : BookingState.DECLINED
    axios
      .patch(
        `${apiUrl}/bookings/${bookingId}`,
        { state: newState },
        { headers: { Authorization: `Bearer ${token}` } },
      )
      .then(() => {
        onUpdate?.()
        setIsModalOpen(false)
      })
      .catch(error => {
        console.error('Error updating booking:', error)
        setIsModalOpen(false)
      })
  }

  return (
    <>
      {state === BookingState.PENDING ? (
        <div className="flex flex-col items-center justify-center gap-2 py-5">
          <Button isPrimary text="Accept" className="py-3" onClick={() => handleClick('A')} />
          <Button
            isPrimary={false}
            text="Decline"
            className="py-3"
            onClick={() => handleClick('D')}
          />
        </div>
      ) : (
        <p className="mb-4 px-6 text-amber-200 lg:text-base lg:font-extralight lg:tracking-wider">
          {formatBookingStatus(state)}
        </p>
      )}
      <ConfirmModal
        isOpen={isModalOpen}
        title={modalTitle}
        text={text}
        message={modalText}
        variant="default"
        onConfirm={() => pendingAction?.()}
        onCancel={() => setIsModalOpen(false)}
      />
    </>
  )
}

export default ManageBookingActions
