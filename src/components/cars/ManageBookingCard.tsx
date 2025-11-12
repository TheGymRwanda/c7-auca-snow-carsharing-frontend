import axios from 'axios'
import { CalendarIcon, TimeIcon } from '../../assets'
import { BookingState, BookingWithReferences } from '../../util/api'
import { formatBookingStatus } from '../../util/booking'
import { convertMonth, timeFormatter } from '../../util/date'
import ButtonComponent from '../ui/Button'
import { apiUrl } from '../../util/apiUrl'
import { useState } from 'react'
import MessageModal from '../ui/MessageModal'

function ManageBookingCard({
  booking,
}: {
  booking: BookingWithReferences & { imageUrl: string | null; state: BookingState }
}) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [modalText, setModalText] = useState<string>('')
  const [modalTitle, setModalTitle] = useState<string>('')
  const handleClick = (bookingId: number, action: 'A' | 'D') => {
    const state = action === 'A' ? BookingState.ACCEPTED : BookingState.DECLINED
    axios
      .patch(`${apiUrl}/bookings/${bookingId}`, { state })
      .then(() => {
        setIsModalOpen(true)
        const textResponse =
          action === 'A' ? 'Booking successfully accepted' : 'Booking successfully declined'
        setModalText(textResponse)
        setModalTitle('Success')
      })
      .catch(error => {
        setIsModalOpen(true)
        setModalText(error.message)
        setModalTitle('Error')
      })
  }
  return (
    <>
      <div className="flex flex-col justify-center">
        <div className="w-72 text-text">
          <div className="flex justify-center  ">
            <img src={booking.imageUrl || undefined} alt="" className="w-60 " />
          </div>
          <div>
            <p className="font-lora text-xl font-medium">{booking.car.name}</p>
            <p>Requested by: {booking.renter.name}</p>
          </div>
          <div className="flex justify-between py-5 text-sm">
            <div>
              <p>from</p>
              <div className="flex items-center gap-2 py-2">
                <CalendarIcon />
                <p>{`${booking.startDate.getDate()}  ${convertMonth(
                  booking.startDate.getMonth(),
                )} ${booking.startDate.getFullYear()}`}</p>
              </div>
              <div className="flex items-center gap-2">
                <TimeIcon />
                <p>{timeFormatter(booking.startDate)}</p>
              </div>
            </div>
            <div>
              <p>to</p>
              <div className="flex items-center gap-2 py-2">
                <CalendarIcon />
                <p>
                  {`${booking.endDate.getDate()} ${convertMonth(
                    booking.endDate.getMonth(),
                  )} ${booking.endDate.getFullYear()}`}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <TimeIcon />
                <p>{timeFormatter(booking.endDate)}</p>
              </div>
            </div>
          </div>
        </div>
        {booking.state === BookingState.PENDING ? (
          <div className="flex flex-col items-center justify-center gap-2 py-5">
            <ButtonComponent isPrimary text="Accept" onClick={() => handleClick(booking.id, 'A')} />
            <ButtonComponent
              isPrimary={false}
              text="Decline"
              onClick={() => handleClick(booking.id, 'D')}
            />
          </div>
        ) : (
          <p className="text-amber-200">{formatBookingStatus(booking.state)}</p>
        )}
      </div>
      {
        <MessageModal
          isOpen={isModalOpen}
          message={modalText}
          onClick={() => setIsModalOpen(false)}
          title={modalTitle}
        />
      }
    </>
  )
}

export default ManageBookingCard
