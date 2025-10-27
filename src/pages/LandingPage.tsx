import { Link } from 'react-router-dom'
import ButtonComponent from '../components/ui/Button'
import Header from '../components/Header'

export default function LandingPage() {
  return (
    <>
      <Header />
      <div className="flex h-screen flex-col items-center justify-around px-5 py-10">
        <div className="text-center font-lora text-gray-100">
          <h1 className="mt-3 text-5xl font-bold">MONI</h1>
          <h2 className="mb-6 text-5xl font-medium italic">Share</h2>
        </div>

        <p className="px-8  text-center font-lora text-xl font-medium text-text">
          Start sharing your Monis with the world
        </p>
        <Link to="/login" className="block w-10/12">
          <ButtonComponent text="Log In" isPrimary />
        </Link>
      </div>
    </>
  )
}
