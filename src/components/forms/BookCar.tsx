import ButtonComponent from '../ui/Button'
import TextField from '@mui/material/TextField'
import type { Dayjs } from 'dayjs'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import type { TextFieldProps } from '@mui/material/TextField'

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

      {/* Start date */}
      <div className="flex flex-col">
        <label htmlFor="start-date" className="mb-1 text-sm">
          Start date
        </label>

        <div className="rounded-full bg-primary-light-formButtons text-white outline-none">
          <DateTimePicker
            value={startDate}
            onChange={newVal => setStartDate(newVal)}
            renderInput={params => (
              <TextField
                {...(params as TextFieldProps)}
                id="start-date"
                fullWidth
                variant="standard"
                InputProps={{
                  ...(params as TextFieldProps).InputProps,
                  disableUnderline: true,
                  style: { background: 'transparent' },
                }}
              />
            )}
          />
        </div>
      </div>

      {/* End date */}
      <div className="flex flex-col">
        <label htmlFor="end-date" className="mb-1 text-sm">
          End date
        </label>

        <div className="rounded-full bg-primary-light-formButtons text-white outline-none">
          <DateTimePicker
            value={endDate}
            onChange={newVal => setEndDate(newVal)}
            minDateTime={startDate ?? undefined}
            renderInput={params => {
              const p = params as TextFieldProps
              return (
                <TextField
                  {...p}
                  id="end-date"
                  fullWidth
                  variant="standard"
                  InputProps={{
                    ...p.InputProps,
                    disableUnderline: true,
                    style: { background: 'transparent' },
                  }}
                />
              )
            }}
          />
        </div>
      </div>

      <div className="mt-8">
        <ButtonComponent text="Search Available Cars" isPrimary type="submit" />
      </div>
    </div>
  </form>
)

export default BookCarForm
