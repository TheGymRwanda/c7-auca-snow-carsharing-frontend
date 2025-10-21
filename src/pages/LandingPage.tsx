import Header from '../components/Header'
import ButtonComponent from '../components/ui/Button'

export default function LandingPage() {
  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-around px-5 py-10">
        <div className="py-10 text-center font-lora text-gray-100">
          <h1 className="mt-3 text-5xl font-bold">MONI</h1>
          <h2 className="mb-6 text-5xl font-medium italic">Share</h2>
        </div>

        <p className="px-8 py-20 text-center font-lora text-xl font-medium text-text">
          Start sharing your Monis with the world
        </p>
        <ButtonComponent text="Log In" isPrimary />
      </div>
    </>
  )
}
