import { ChevronDownIcon } from '../../assets'

interface FormSelectProps {
  label: string
  id: string
  options: { value: string | number; label: string }[]
  defaultOption?: string
  onChange: (value: string) => void
}

function FormSelect({ label, id, options, defaultOption, onChange }: FormSelectProps) {
  return (
    <div className="relative flex flex-col">
      <label htmlFor={id} className="mb-1 text-sm">
        {label}
      </label>
      <select
        id={id}
        required
        className="cursor-pointer appearance-none rounded-full border-none bg-primary-light-formButtons p-4 text-white outline-none"
        onChange={e => onChange(e.target.value)}
      >
        {defaultOption && <option value="none">{defaultOption}</option>}
        {options.map(option => (
          <option value={option.value} key={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDownIcon className="absolute right-4 top-9 z-10 size-7 cursor-pointer" />
    </div>
  )
}

export default FormSelect
