import { BookingState } from '../../util/api'
import ManageBookingActions from './ManageBookingActions'
import MyBookingActions from './MyBookingActions'

type BookingActionsProps = {
  bookingId: number
  carId: number
  state: BookingState
  variant: 'manage' | 'my'
  onUpdate?: () => void
}

function BookingActions({ bookingId, carId, state, variant, onUpdate }: BookingActionsProps) {
  return variant === 'manage' ? (
    <ManageBookingActions bookingId={bookingId} state={state} onUpdate={onUpdate} />
  ) : (
    <MyBookingActions bookingId={bookingId} carId={carId} state={state} />
  )
}

export default BookingActions
