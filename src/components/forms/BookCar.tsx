import ButtonComponent from '../ui/Button'
import DateTimePicker from '../ui/DateTimePicker'
import type { Dayjs } from 'dayjs'

interface BookCarFormProps {
  startDate: Dayjs | null
  endDate: Dayjs | null
  setStartDate: (d: Dayjs | null) => void
  setEndDate: (d: Dayjs | null) => void
  handleSubmit: (e: React.FormEvent) => void
}

const BookCarForm = ({
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  handleSubmit,
}: BookCarFormProps) => (
  <form onSubmit={handleSubmit}>
    <div className="mx-auto flex max-w-md flex-col gap-8">
      <DateTimePicker label="Start date" value={startDate} onChange={setStartDate} />

      <DateTimePicker
        label="End date"
        value={endDate}
        onChange={setEndDate}
        minDateTime={startDate ?? undefined}
      />

      <div className="mt-8">
        <ButtonComponent text="Search Available Cars" className="py-3" isPrimary type="submit" />
      </div>
    </div>
  </form>
)

export default BookCarForm
