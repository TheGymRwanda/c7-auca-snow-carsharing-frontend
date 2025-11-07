import { useNavigate } from 'react-router-dom'
import ButtonComponent from '../components/ui/Button'
import { BrandHeader } from '../components/ui/BrandHeader'

export default function LandingPage() {
  const navigate = useNavigate()
  function handleLoginClick() {
    navigate('/login')
  }
  return (
    <>
      <div className="mt-28 flex flex-col items-center justify-start bg-primary-dark px-6 py-10">
        <div className="mb-28 grid space-y-14">
          <BrandHeader />

          <p className="px-6  text-center font-lora text-2xl font-medium text-text">
            Start sharing your Monis with the world
          </p>
        </div>
        <ButtonComponent
          text="Log In"
          isPrimary
          className="block w-full font-bold"
          onClick={handleLoginClick}
        />
      </div>
    </>
  )
}
