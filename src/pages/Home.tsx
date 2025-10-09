import ButtonComponent from '../ui/buttonComponent'
import { Link } from 'react-router-dom'

const Home = () => (
  <div className="grid min-h-screen items-center bg-[#265E78] text-center font-[Lora] text-white">
    <div className="bg-[#265E78] p-6 ">
      <h1 className="mt-3 text-5xl font-bold">MONI</h1>
      <h2 className="mb-6 text-5xl italic">Share</h2>
      <p className="mb-12  text-xl">
        Hello Manuela! <br />
        <span className="text-xl">What are you up to today?</span>
      </p>
      <div className="space-y-5">
        <Link to="/car">
          <ButtonComponent text="Book Car" isPrimary />
        </Link>

        <p className="mb-10 text-sm">or</p>
        <div className="mt-4 flex w-full flex-col space-y-6">
          <ButtonComponent text="See My Cars" isPrimary={false} />
          <Link to="/bookings" className="mt-2">
            <ButtonComponent text="See My Bookings" isPrimary={false} />
          </Link>
        </div>
      </div>
    </div>
  </div>
)

export default Home
