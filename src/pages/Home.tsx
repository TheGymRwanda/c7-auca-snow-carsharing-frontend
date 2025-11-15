import Button from '../components/ui/Button'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Home = () => {
  const { user } = useAuth()
  const navigate = useNavigate()

  return (
    <div className="mt-28 flex flex-col justify-start bg-primary-dark text-center font-lora text-white">
      <div className="bg-primary-dark p-6 ">
        <h1 className="mb-8 mt-3 text-5xl font-bold leading-none text-white">
          <span className="block">MONI</span>
          <span className="block font-normal italic">share</span>
        </h1>

        <p className="mb-12 text-xl">
          {`Hello ${user?.name} !`} <br />
          <span className="text-xl">What are you up to today?</span>
        </p>
        <div className="space-y-5">
          <Button text="Book Car" isPrimary onClick={() => navigate('/car')} />

          <p className="mb-10 text-sm">or</p>
          <div className="mt-4 flex w-full flex-col space-y-6">
            <Button text="See My Cars" isPrimary={false} onClick={() => navigate('/my-cars')} />
            <Button
              text="See My Bookings"
              isPrimary={false}
              onClick={() => navigate('/bookings')}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
