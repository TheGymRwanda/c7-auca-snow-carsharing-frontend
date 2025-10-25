import { Link } from 'react-router-dom'
import ButtonComponent from '../components/ui/Button'

export default function LandingPage() {
  return (
    <>
      <div className="flex h-screen flex-col items-center justify-center bg-primary-dark px-6 py-10">
        <div className="mb-28 grid space-y-14">
          <div className="text-center font-lora text-gray-100">
            <h1 className="mt-3 text-5xl font-bold">MONI</h1>
            <h2 className="mb-6 text-5xl font-medium italic">Share</h2>
          </div>

          <p className="px-6  text-center font-lora text-2xl font-medium text-text">
            Start sharing your Monis with the world
          </p>
        </div>
        <Link to="/login" className="block w-full font-bold">
          <ButtonComponent text="Log In" isPrimary />
        </Link>
      </div>
    </>
  )
}
