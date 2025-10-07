interface LoaderProps {
  size?: 'sm' | 'md' | 'lg'
  variant?: 'page' | 'button'
  className?: string
  isPrimary?: boolean
}

function LoaderComponent({
  size = 'md',
  variant = 'page',
  className = '',
  isPrimary = false,
}: LoaderProps) {
  const sizeClasses = {
    sm: 'h-4 w-4 border-2',
    md: 'h-6 w-6 border-2',
    lg: 'h-12 w-12 border-4',
  }

  const getSpinnerColor = () => {
    if (variant === 'button') {
      return isPrimary ? 'border-[#265E78]' : 'border-white'
    }
    return 'border-[#67cfff]'
  }

  const spinner = (
    <div
      className={`animate-spin rounded-full border-t-transparent ${
        sizeClasses[size]
      } ${getSpinnerColor()}`}
    />
  )

  if (variant === 'button') {
    return <div className={`flex items-center justify-center ${className}`}>{spinner}</div>
  }

  return <div className={`flex h-screen items-center justify-center ${className}`}>{spinner}</div>
}

export default LoaderComponent
