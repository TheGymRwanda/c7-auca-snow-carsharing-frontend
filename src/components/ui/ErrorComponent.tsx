import { useNavigate } from 'react-router-dom'
import ButtonComponent from './Button'

interface ErrorComponentProps {
  error?: Error
  message?: string
}
export default function ErrorComponent({ message }: ErrorComponentProps) {
  const navigate = useNavigate()

  return (
    <div className="mt-10 flex min-h-screen items-center justify-center">
      <div className="text-center text-red-400">
        <h3 className="mb-2 text-xl font-semibold">{message || 'An error occurred'}</h3>
        <ButtonComponent text="Back to Home" isPrimary={true} onClick={() => navigate('/home')} />
      </div>
    </div>
  )
}
