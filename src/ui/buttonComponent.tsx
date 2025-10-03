import React from 'react'

type ButtonComponentProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  text: string
  isPrimary: boolean
  className?: string
}

function ButtonComponent({ text, className, isPrimary, ...props }: ButtonComponentProps) {
  return (
    <button
      {...props}
      className={`w-full rounded-full font-semibold  ${className ?? ''} 
        ${isPrimary ? 'bg-gray-100 text-[#265E78]' : 'border-2 bg-[#265E78] text-white'} py-3`}
    >
      {text}
    </button>
  )
}

export default ButtonComponent
