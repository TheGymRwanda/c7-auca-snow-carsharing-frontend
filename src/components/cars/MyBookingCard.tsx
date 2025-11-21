import { useEffect } from 'react'
import { BookingState, BookingWithReferences } from '../../util/api'
import { formatBookingStatus } from '../../util/booking'
import { useBookingActions } from '../../hooks/useBookingActions'
import Button from '../ui/Button'
import MessageModal from '../ui/MessageModal'
import BookingDateInfo from './BookingDateInfo'

type Props = {
  booking: BookingWithReferences & {
    imageUrl: string | null
    state: BookingState
  }
}

function MyBookingCard({ booking }: Props) {
  const {
    modalState,
    closeModal,
    bookingState,
    setBookingState,
    handleBookingAction,
    handleCarAction,
  } = useBookingActions(booking.id, booking.car.id)

  useEffect(() => {
    setBookingState(booking.state)
  }, [booking.state, setBookingState])

  const currentState = bookingState ?? booking.state

  return (
    <>
      <div className="">
        <div className="w-72 text-text md:w-80">
          <div className="flex justify-center">
            <img src={booking.imageUrl || undefined} alt="" className="w-60 md:w-72" />
          </div>
          <div>
            <p className="font-lora text-xl font-medium">{booking.car.name}</p>
            <p>Owned by: {booking.car.owner.name}</p>
          </div>
          <div className="flex justify-between py-5 text-sm">
            <BookingDateInfo label="from" date={booking.startDate} />
            <BookingDateInfo label="to" date={booking.endDate} />
          </div>
        </div>

        <div className="">
          {currentState === BookingState.PENDING && (
            <p className="text-error">Booking request pending.</p>
          )}

          {currentState === BookingState.ACCEPTED && (
            <>
              <p className="text-amber-200">{formatBookingStatus(currentState)}</p>
              <Button isPrimary text="Pick Up" onClick={() => handleBookingAction('PICK_UP')} />
            </>
          )}

          {currentState === BookingState.PICKED_UP && (
            <>
              <p className="text-amber-200">{formatBookingStatus(currentState)}</p>
              <Button isPrimary text="Unlock" onClick={() => handleCarAction('UNLOCK')} />
              <Button isPrimary={false} text="Lock" onClick={() => handleCarAction('LOCK')} />
              <Button
                isPrimary={false}
                text="Return"
                onClick={() => handleBookingAction('RETURN')}
              />
            </>
          )}

          {(currentState === BookingState.RETURNED || currentState === BookingState.DECLINED) && (
            <p className="text-amber-200">{formatBookingStatus(currentState)}</p>
          )}
        </div>
      </div>

      <MessageModal
        isOpen={modalState.isOpen}
        message={modalState.text}
        title={modalState.title}
        onClick={closeModal}
      />
    </>
  )
}

export default MyBookingCard
