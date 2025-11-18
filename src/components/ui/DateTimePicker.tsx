import { useState } from 'react'
import type { Dayjs } from 'dayjs'
import dayjs from 'dayjs'
import { StaticDateTimePicker } from '@mui/x-date-pickers/StaticDateTimePicker'
import { Dialog, DialogContent, DialogActions, Button } from '@mui/material'

interface DateTimePickerProps {
  label: string
  value: Dayjs | null
  onChange: (date: Dayjs | null) => void
  minDateTime?: Dayjs
}

const DateTimePicker = ({ label, value, onChange, minDateTime }: DateTimePickerProps) => {
  const [open, setOpen] = useState(false)
  const [tempDate, setTempDate] = useState<Dayjs | null>(null)

  const handleClick = () => {
    setTempDate(value)
    setOpen(true)
  }

  const handleConfirm = () => {
    onChange(tempDate)
    setOpen(false)
  }

  const handleCancel = () => {
    setOpen(false)
    setTempDate(null)
  }

  return (
    <>
      <div className="flex flex-col">
        <label className="mb-1 text-sm text-white">
          {label}
        </label>
        <div 
          className="cursor-pointer rounded-full bg-primary-light-formButtons p-4 text-start text-white"
          onClick={handleClick}
        >
          {value ? value.format('MM/DD/YYYY hh:mm A') : dayjs().format('MM/DD/YYYY hh:mm A')}
        </div>
      </div>

      <Dialog 
        open={open} 
        onClose={handleCancel}
        fullWidth
        className="w-[100vw]"
        maxWidth={false}
      >
        <DialogContent className="p-0">
          <StaticDateTimePicker
            value={tempDate || dayjs()}
            onChange={setTempDate}
            minDateTime={minDateTime ?? dayjs()}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>CANCEL</Button>
          <Button onClick={handleConfirm}>OK</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default DateTimePicker