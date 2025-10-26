import { Link } from 'react-router-dom'
import ButtonComponent from '../components/ui/Button'
import { Logo, ProfileIcon } from '../assets'

export default function LandingPage() {
  return (
    <>
      <div className="flex h-screen flex-col items-center justify-center bg-primary-dark px-6 py-10 lg:flex-row">
        <div className="flex flex-col lg:ml-12 lg:w-1/2">
          <div className="mb-32 lg:mb-1 grid space-y-14">
            <div className="lg:flex flex-col text-gray-100 lg:justify-items-start ">
              <div className="text-center lg:text-start text-5xl lg:text-6xl font-lora">
                <h1 className="mt-3 font-bold">MONI</h1>
                <h2 className="mb-6 lg:mb-8 lg:ml-14 italic">Share</h2>
              </div>
              <h1 className="font-lora text-2xl my-6 hidden lg:block">
                Start sharing your Monis with the world
              </h1>
              <p className="font-lora text-lg mb-12 italic text-gray-300/90 hidden lg:block">
                Join thousands of drivers making extra income while helping others get around
                sustainably.
              </p>
            </div>

            <p className="px-6 text-center font-lora text-2xl font-medium text-text lg:hidden">
              Start sharing your Monis with the world
            </p>
          </div>
          <Link to="/login" className="block lg:w-5/12 font-bold">
            <ButtonComponent text="Log In -->" isPrimary />
          </Link>
        </div>
        <div className="hidden relative w-1/2 h-screen lg:flex">
          <Logo className="absolute w-full h-full opacity-5" />
          <div className="absolute top-[5%] -left-[10%] w-[35vw] h-[24vh] bg-gradient-to-r z-10 shadow-2xl shadow-primary-light-hover from-primary-dark via-primary-light/90 to-primary-dark rounded-xl p-[2vw]">
            <ProfileIcon className="h-[8vh] w-[8vh] text-gray-100/70 bg-primary-light rounded-lg px-[0.7vw]" />
            <h1 className="text-[1.7vw] mt-4 text-gray-100 font-bold">Community Driven</h1>
            <p className="text-[1.4vw] mt-1 text-gray-300 italic">
              Thounds of divers sharing their vehicles for society
            </p>
          </div>
          <div className="absolute top-[37.5%] right-[6%] w-[35vw] h-[24vh] bg-gradient-to-r z-10 shadow-2xl shadow-primary-light-hover from-primary-dark via-primary-light/90 to-primary-dark rounded-xl p-[2vw]">
            <ProfileIcon className="h-[8vh] w-[8vh] text-gray-100/70 bg-primary-light rounded-lg px-[0.7vw]" />
            <h1 className="text-[1.7vw] mt-4 text-gray-100 font-bold">Community Driven</h1>
            <p className="text-[1.4vw] mt-1 text-gray-300 italic">
              Thounds of divers sharing their vehicles for society
            </p>
          </div>
          <div className="absolute bottom-[5%] -left-[5%] w-[35vw] h-[24vh] bg-gradient-to-r z-10 shadow-2xl shadow-primary-light-hover from-primary-dark via-primary-light/90 to-primary-dark rounded-xl p-[2vw]">
            <ProfileIcon className="h-[8vh] w-[8vh] text-gray-100/70 bg-primary-light rounded-lg px-[0.7vw]" />
            <h1 className="text-[1.7vw] mt-4 text-gray-100 font-bold">Community Driven</h1>
            <p className="text-[1.4vw] mt-1 text-gray-300 italic">
              Thounds of divers sharing their vehicles for society
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
