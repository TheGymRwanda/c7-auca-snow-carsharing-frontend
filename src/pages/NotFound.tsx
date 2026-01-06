import { useNavigate } from 'react-router-dom'
import { ErrorPageIcon } from '../assets/index'
import Button from '../components/ui/Button'

function NotFound() {
  const navigate = useNavigate()
  return (
    <div className="flex min-h-screen items-center justify-center bg-primary-dark font-lora">
      <div className="p-4">
        <h1 className="mb-6 text-center text-4xl font-bold  text-white lg:text-6xl">OOOOOPS!</h1>
        <div className="mx-7 lg:mx-20">
          <ErrorPageIcon />
        </div>
        <p className="mb-12 mt-6 text-center text-lg text-white lg:text-2xl">
          Something went wrong.
          <br />
          Try something else until we fix it.
        </p>
        <Button
          text="Go Back To Home"
          className="py-3 text-lg"
          isPrimary={true}
          onClick={() => navigate('/')}
        />
      </div>
    </div>
  )
}

export default NotFound
