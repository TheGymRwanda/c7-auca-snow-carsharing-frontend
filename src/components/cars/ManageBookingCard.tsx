import axios from 'axios'
import { CalendarIcon, TimeIcon } from '../../assets'
import { BookingState, BookingWithReferences } from '../../util/api'
import { formatBookingStatus } from '../../util/booking'
import { convertMonth, timeFormatter } from '../../util/date'
import Button from '../ui/Button'
import { apiUrl } from '../../util/apiUrl'
import { getAuthToken } from '../../util/auth'
import { useState } from 'react'
import ConfirmModal from '../ui/ConfirmModal'

const DateDisplay = ({ date, label }: { date: Date; label: string }) => (
  <div>
    <p>{label}</p>
    <div className="flex items-center gap-2 py-2">
      <CalendarIcon />
      <p>{`${date.getDate()} ${convertMonth(date.getMonth())} ${date.getFullYear()}`}</p>
    </div>
    <div className="flex items-center gap-2">
      <TimeIcon />
      <p>{timeFormatter(date)}</p>
    </div>
  </div>
)

function ManageBookingCard({
  booking,
  onUpdate,
}: {
  booking: BookingWithReferences & { imageUrl: string | null; state: BookingState }
  onUpdate?: () => void
}) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [modalText, setModalText] = useState<string>('')
  const [modalTitle, setModalTitle] = useState<string>('')
  const [pendingAction, setPendingAction] = useState<(() => void) | null>(null)
  const [text, setText] = useState('')
  const token = getAuthToken()

  const handleClick = (bookingId: number, action: 'A' | 'D') => {
    const actionText = action === 'A' ? 'accept' : 'decline'
    setText(actionText)
    setModalTitle(`Confirm ${actionText}`)
    setModalText(`Are you sure you want to ${actionText} this booking?`)
    setPendingAction(() => () => executeAction(bookingId, action))
    setIsModalOpen(true)
  }

  const executeAction = (bookingId: number, action: 'A' | 'D') => {
    const state = action === 'A' ? BookingState.ACCEPTED : BookingState.DECLINED
    axios
      .patch(
        `${apiUrl}/bookings/${bookingId}`,
        { state },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
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
      <div className="flex flex-col justify-center text-gray-100 lg:grid lg:grid-cols-2">
        <div className="flex justify-center">
          <img
            src={booking.imageUrl || undefined}
            alt=""
            className="w-60 scale-115 lg:w-72 lg:scale-150 "
          />
        </div>
        <div>
          <div className="px-6">
            <p className="font-lora text-xl font-medium">{booking.car.name}</p>
            <p>Requested by: {booking.renter.name}</p>
          </div>
          <div className="flex justify-between px-6 py-5 text-sm">
            <DateDisplay date={booking.startDate} label="from" />
            <DateDisplay date={booking.endDate} label="to" />
          </div>
          {booking.state === BookingState.PENDING ? (
            <div className="flex flex-col items-center justify-center gap-2 py-5">
              <Button
                isPrimary
                text="Accept"
                className="py-3"
                onClick={() => handleClick(booking.id, 'A')}
              />
              <Button
                isPrimary={false}
                text="Decline"
                className="py-3"
                onClick={() => handleClick(booking.id, 'D')}
              />
            </div>
          ) : (
            <p className="px-6 text-amber-200">{formatBookingStatus(booking.state)}</p>
          )}
        </div>
      </div>
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

export default ManageBookingCard
