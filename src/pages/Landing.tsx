import { useNavigate } from 'react-router-dom'
import Button from '../components/ui/Button'

function Landing() {
  const navigate = useNavigate()
  return (
    <div className="mt-28 flex flex-col items-center justify-start bg-primary-dark px-6 py-10">
      <div className="mb-28 grid space-y-14">
        <div className="text-center font-lora text-gray-100">
          <h1 className="mt-3 text-5xl font-bold leading-none text-white">
            <span className="block">MONI</span>
            <span className="block italic font-normal">share</span>
          </h1>
        </div>

        <p className="px-6  text-center font-lora text-2xl font-medium text-text">
          Start sharing your Monis with the world
        </p>
      </div>
      <Button text="Log In" isPrimary onClick={() => navigate('/login')} />
    </div>
  )
}

export default Landing
