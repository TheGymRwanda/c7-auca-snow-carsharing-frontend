interface FormInputProps {
  label: string
  id: string
  type?: string
  isRequired?: boolean
  placeholder?: string
  className?: string
  onChange: (value: string) => void
}

function FormInput({
  label,
  id,
  type = 'text',
  placeholder,
  isRequired = true,
  className = '',
  onChange,
}: FormInputProps) {
  return (
    <div className={`flex flex-col ${className}`}>
      <label htmlFor={id} className="mb-1 text-sm">
        {label}
      </label>
      <input
        type={type}
        id={id}
        required={isRequired}
        placeholder={placeholder}
        className="w-full rounded-full border-none bg-primary-light-formButtons p-4 text-white outline-none placeholder:text-white/70"
        onChange={e => onChange(e.target.value)}
      />
    </div>
  )
}

export default FormInput
