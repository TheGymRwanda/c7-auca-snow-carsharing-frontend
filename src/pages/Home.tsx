import Button from '../components/ui/Button'
import { useAuth } from '../context/AuthContext'
import useCars from '../hooks/useCars'
import useCarTypes from '../hooks/useCarTypes'
import HomeCarsRow from '../components/home/HomeCarsRow'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const [{ data: cars, loading }] = useCars()
  const [{ data: carTypes }] = useCarTypes()
  const { user } = useAuth()
  const navigate = useNavigate()

  const myCars = cars?.filter(c => c.ownerId === user?.id) || []

  return (
    <div className="flex flex-col justify-start bg-primary-dark text-center text-white max-md:mt-28 lg:text-start">
      <div className="z-50 bg-primary-dark p-6 lg:p-10 xl:p-12 2xl:p-16 ">
        <h1 className="mb-8 mt-3 text-5xl font-bold leading-none text-white lg:hidden">
          <span className="block">MONI</span>
          <span className="block font-normal italic">share</span>
        </h1>

        <p className="mb-12 font-lora text-xl lg:space-y-2 lg:text-3xl 2xl:text-5xl">
          {`Hello ${user?.name} !`} <br />
          <span>What are you up to today?</span>
        </p>
        <div className="space-y-5 lg:hidden">
          <Button text="Book Car" className="py-3" isPrimary onClick={() => navigate('/car')} />

          <p className="mb-10 text-sm">or</p>
          <div className="mt-4 flex w-full flex-col space-y-6">
            <Button
              text="See My Cars"
              className="py-3"
              isPrimary={false}
              onClick={() => navigate('/my-cars')}
            />
            <Button
              text="See My Bookings"
              isPrimary={false}
              className="py-3"
              onClick={() => navigate('/bookings')}
            />
          </div>
        </div>
        <div className="max-md:hidden">
          <HomeCarsRow
            title="Available Cars"
            cars={cars}
            loading={loading}
            carTypes={carTypes}
            seeMoreLink="/car"
          />
          <HomeCarsRow
            title="My Cars"
            cars={myCars}
            carTypes={carTypes}
            loading={loading}
            seeMoreLink="/my-cars"
          />
        </div>
      </div>
    </div>
  )
}

export default Home
