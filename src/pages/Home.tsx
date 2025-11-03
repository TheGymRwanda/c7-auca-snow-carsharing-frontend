import ButtonComponent from '../components/ui/Button'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Home = () => {
  const { user } = useAuth()

  return (
    <div className="mt-28 flex flex-col justify-start bg-primary-dark text-center font-lora text-white">
      <div className="bg-primary-dark p-6 ">
        <h1 className="mt-3 text-5xl font-bold">MONI</h1>
        <h2 className="mb-8 text-5xl italic">Share</h2>
        <p className="mb-12  text-xl">
          {`Hello ${user?.name} !`} <br />
          <span className="text-xl">What are you up to today?</span>
        </p>
        <div className="space-y-5">
          <Link to="/car">
            <ButtonComponent text="Book Car" isPrimary />
          </Link>

          <p className="mb-10 text-sm">or</p>
          <div className="mt-4 flex w-full flex-col space-y-6">
            <Link to="/my-cars">
              <ButtonComponent text="See My Cars" isPrimary={false} />
            </Link>
            <Link to="/bookings" className="mt-2">
              <ButtonComponent text="See My Bookings" isPrimary={false} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
