import { BookingState } from '../../util/api'
import { formatBookingStatus } from '../../util/booking'
import { useBookingActions } from '../../hooks/useBookingActions'
import Button from '../ui/Button'
import ConfirmModal from '../ui/ConfirmModal'

interface MyBookingActionsProps {
  bookingId: number
  carId: number
  state: BookingState
}

function MyBookingActions({ bookingId, carId, state }: MyBookingActionsProps) {
  const { modalState, closeModal, bookingState, isLoading, handleBookingAction, handleCarAction } =
    useBookingActions(bookingId, carId)

  const currentState = bookingState ?? state

  return (
    <>
      {currentState === BookingState.PENDING && (
        <p className="px-6 text-error lg:text-base lg:font-extralight lg:tracking-wider">
          Booking request pending.
        </p>
      )}

      {currentState === BookingState.ACCEPTED && (
        <>
          <p className="mb-4 px-6 text-amber-200 lg:text-base lg:font-extralight lg:tracking-wider">
            {formatBookingStatus(currentState)}
          </p>
          <Button
            isPrimary
            text={isLoading ? 'Loading...' : 'Pick Up'}
            onClick={() => handleBookingAction('PICK_UP')}
            className="py-3"
            disabled={isLoading}
          />
        </>
      )}

      {currentState === BookingState.PICKED_UP && (
        <>
          <p className="mb-4 px-6 text-amber-200 lg:text-base lg:font-extralight lg:tracking-wider">
            {formatBookingStatus(currentState)}
          </p>
          <Button
            isPrimary
            text={isLoading ? 'Loading...' : 'Unlock'}
            onClick={() => handleCarAction('UNLOCK')}
            className="py-3"
            disabled={isLoading}
          />
          <Button
            isPrimary={false}
            text={isLoading ? 'Loading...' : 'Lock'}
            onClick={() => handleCarAction('LOCK')}
            className="py-3"
            disabled={isLoading}
          />
          <Button
            isPrimary={false}
            text={isLoading ? 'Loading...' : 'Return'}
            onClick={() => handleBookingAction('RETURN')}
            className="py-3"
            disabled={isLoading}
          />
        </>
      )}

      {(currentState === BookingState.RETURNED || currentState === BookingState.DECLINED) && (
        <p className="px-6 text-amber-200 lg:text-base lg:font-extralight lg:tracking-wider">
          {formatBookingStatus(currentState)}
        </p>
      )}

      <ConfirmModal
        isOpen={modalState.isOpen}
        message={modalState.text}
        title={modalState.title}
        onClick={closeModal}
        variant="message"
      />
    </>
  )
}

export default MyBookingActions
