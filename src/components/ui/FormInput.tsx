interface FormInputProps {
  label: string
  id: string
  type?: string
  placeholder?: string
  className?: string
  onChange: (value: string) => void
}

function FormInput({
  label,
  id,
  type = 'text',
  placeholder,
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
        placeholder={placeholder}
        className="rounded-full border-none bg-primary-light-formButtons p-4 text-white outline-none placeholder:text-white/70 w-full"
        onChange={e => onChange(e.target.value)}
      />
    </div>
  )
}

export default FormInput