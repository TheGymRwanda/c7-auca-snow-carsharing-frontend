import { BookingState } from './api'

export function formatBookingStatus(status: BookingState | undefined) {
  switch (status) {
    case BookingState.ACCEPTED:
      return 'Booking accepted'
    case BookingState.PENDING:
      return 'Pending'
    case BookingState.RETURNED:
      return 'Car returned'
    case BookingState.DECLINED:
      return 'Booking declined'
    case BookingState.PICKED_UP:
      return 'Car picked up'
    default:
      return 'Unknown'
  }
}
