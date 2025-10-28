import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import ButtonComponent from '../components/ui/Button'

export default function LandingPage() {
  useEffect(() => {
    const link = document.createElement('link')
    link.rel = 'preload'
    link.as = 'image'
    link.href =
      'https://res.cloudinary.com/dgwh59vry/image/upload/c_pad,ar_1:1/v1725970827/Hyundai-Tucson-Car_o70jlc.webp'
    document.head.appendChild(link)

    return () => {
      if (document.head.contains(link)) {
        document.head.removeChild(link)
      }
    }
  }, [])

  return (
    <>
      <div className="flex h-screen flex-col items-center justify-center overflow-y-hidden bg-primary-dark px-6 py-10 lg:flex-row">
        <div className="flex flex-col lg:ml-12 lg:w-1/2">
          <div className="mb-32 lg:mb-1 grid space-y-14">
            <div className="lg:flex flex-col text-gray-100 lg:justify-items-start ">
              <div className="text-center lg:text-start text-5xl lg:text-6xl 2xl:text-7xl font-lora">
                <h1 className="mt-3 font-bold">MONI</h1>
                <h2 className="mb-6 lg:mb-8 lg:ml-14 italic">Share</h2>
              </div>
              <h1 className="font-lora text-2xl 2xl:text-3xl my-6 hidden lg:block">
                Start sharing your Monis with the world
              </h1>
              <p className="font-lora text-lg 2xl:text-xl mb-12 italic text-gray-300/90 hidden lg:block">
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
          <img
            className="absolute w-[39vw] -top-[2%] -left-[15%] max-lg:h-[77vh] h-[77vh]"
            src="https://res.cloudinary.com/dgwh59vry/image/upload/c_pad,ar_1:1/v1725970827/Hyundai-Tucson-Car_o70jlc.webp"
            alt="Hyundai Tucson car available for sharing"
            loading="eager"
            decoding="async"
            width="624"
            height="624"
          />
          <img
            className="absolute w-[39vw] top-[25%] left-[18%] max-lg:h-[77vh] h-[79vh]"
            src="https://res.cloudinary.com/dgwh59vry/image/upload/c_pad,ar_1:1/v1725970842/Mercedes-Benz-Car_vsm9cu.webp"
            alt="Mercedes-Benz car available for sharing"
            loading="lazy"
            decoding="async"
            width="624"
            height="632"
          />
        </div>
      </div>
    </>
  )
}
