import ButtonComponent from '../ui/buttonComponent'
import { Link } from 'react-router-dom'

const Home = () => (
  <div className="min-h-screen grid items-center text-center text-white bg-[#265E78] font-[Lora]">
    <div className="bg-[#265E78] p-6 ">
      <h1 className="font-bold text-4xl mt-3">MONI</h1>
      <h2 className="italic text-3xl mb-6">Share</h2>
      <p className="text-lg  mb-12">
        Hello Manuela! <br />
        <span className="text-sm">What are you up to today?</span>
      </p>
      <div className="space-y-4">
        <Link to="/car">
          <ButtonComponent text="Book Car" isPrimary />
        </Link>

        <p className="text-sm mb-10">or</p>
        <div className="w-full flex flex-col space-y-6 mt-4">
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
