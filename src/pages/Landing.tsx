import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import ButtonComponent from '../components/ui/Button'

function LandingPage() {
  const navigate = useNavigate()
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
        <div className="flex flex-col max-lg:max-w-sm lg:ml-12 lg:w-1/2">
          <div className="mb-32 grid space-y-14 lg:mb-1">
            <div className="flex-col text-gray-100 lg:flex lg:justify-items-start ">
              <div className="text-center font-lora text-5xl lg:text-start lg:text-6xl 2xl:text-7xl">
                <h1 className="mt-3 font-bold">MONI</h1>
                <h2 className="mb-6 italic lg:mb-8 lg:ml-14">Share</h2>
              </div>
              <h1 className="my-6 hidden font-lora text-2xl lg:block 2xl:text-3xl">
                Start sharing your Monis with the world
              </h1>
              <p className="mb-12 hidden font-lora text-lg italic text-gray-300/90 lg:block 2xl:text-xl">
                Join thousands of drivers making extra income while helping others get around
                sustainably.
              </p>
            </div>

            <p className="px-6 text-center font-lora text-2xl font-medium text-text lg:hidden">
              Start sharing your Monis with the world
            </p>
          </div>
          <div className="block font-bold lg:w-5/12">
            <ButtonComponent
              text="Log In -->"
              className="py-3"
              isPrimary
              onClick={() => navigate('/login')}
            />
          </div>
        </div>
        <div className="relative hidden h-screen w-1/2 lg:flex">
          <img
            className="absolute left--15% top--2% h-77vh w-39vw max-lg:h-77vh xl:-left-18% xl:-top-5%"
            src="https://res.cloudinary.com/dgwh59vry/image/upload/c_pad,ar_1:1/v1725970827/Hyundai-Tucson-Car_o70jlc.webp"
            alt="Hyundai Tucson car available for sharing"
            loading="eager"
            decoding="async"
            width="624"
            height="624"
          />
          <img
            className="absolute left-18% top-25% h-79vh w-39vw max-lg:h-77vh"
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

export default LandingPage
