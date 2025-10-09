import React from 'react'
import LoaderComponent from './loaderComponent'

type ButtonComponentProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  text: string
  loadingText?: string
  isPrimary: boolean
  className?: string
  loading?: boolean
  disabled?: boolean
}

function ButtonComponent({
  text,
  loadingText,
  className,
  isPrimary,
  loading = false,
  ...props
}: ButtonComponentProps) {
  return (
    <button
      {...props}
      disabled={loading || props.disabled}
      className={`w-full rounded-full py-3 font-[Inter] font-bold ${className ?? ''} ${
        loading || props.disabled
          ? 'cursor-not-allowed bg-gray-200/80 text-[#265E78]/100'
          : isPrimary
            ? 'bg-gray-100 text-[#265E78]'
            : 'border-2 bg-[#265E78] text-white'
      }`}
    >
      {loading ? (
        <div className="flex items-center justify-center space-x-2">
          <LoaderComponent variant="button" size="sm" isPrimary={true} /> <p>{loadingText}</p>
        </div>
      ) : (
        text
      )}
    </button>
  )
}

export default ButtonComponent
