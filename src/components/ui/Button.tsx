import React from 'react'
import LoaderComponent from './Loader'

type ButtonComponentProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  text: string
  loadingText?: string
  isPrimary: boolean
  className?: string
  loading?: boolean
  disabled?: boolean
  variant?: 'default' | 'delete'
}

function ButtonComponent({
  text,
  loadingText,
  className,
  isPrimary,
  loading = false,
  variant = 'default',
  ...props
}: ButtonComponentProps) {
  return (
    <button
      {...props}
      disabled={loading || props.disabled}
      className={`w-full rounded-full py-3 font-[Inter] font-bold ${className ?? ''} ${
        (loading || props.disabled) && variant !== 'delete'
          ? 'cursor-not-allowed bg-gray-200/80 text-primary-dark/100'
          : variant === 'delete'
          ? 'border-2 border-delete text-delete'
          : isPrimary
          ? 'bg-gray-100 text-primary-dark'
          : 'border-2 bg-primary-dark text-white'
      }`}
    >
      {loading ? (
        <div className="flex items-center justify-center space-x-2">
          <LoaderComponent
            variant={variant === 'delete' ? 'delete' : 'button'}
            size="sm"
            isPrimary={true}
          />
          <p>{loadingText}</p>
        </div>
      ) : (
        text
      )}
    </button>
  )
}

export default ButtonComponent
