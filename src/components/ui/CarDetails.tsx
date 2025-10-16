import ButtonComponent from './Button'
import { CarIcon, ProfileIcon } from '../../assets/index'
import { Link } from 'react-router-dom'

interface ShowCarComponentProps {
  index: number | string
  title: string
  image: string
  owner: string
  location: string
}

function CarDetails({ index, title, image, owner, location }: ShowCarComponentProps) {
  return (
    <div
      key={index}
      className="shadow-card mt-8 flex w-full flex-col self-center rounded-2xl bg-primary-light p-4 px-8"
    >
      <div className="flex gap-6">
        <div className="my-1 ml-2 flex h-44 scale-115 items-center justify-center">
          <img src={image} alt={`${title}'s Picture`} className="max-h-full" />
        </div>
        <div className="grid gap-4">
          <div className="grid gap-4">
            <h2 className="mt-2 whitespace-pre-line text-center font-lora text-xl leading-tight text-white">
              {title}
            </h2>
            <div className="flex flex-col gap-4 text-18 font-light text-gray-100">
              <div className="flex items-center gap-3">
                <ProfileIcon className="size-7" />
                <span>{owner}</span>
              </div>
              <div className="flex items-center gap-3">
                <CarIcon className="size-7" />
                <span>{location}</span>
              </div>
            </div>
          </div>
          <div className="mt-1 font-semibold">
            <Link to={`/car/${index}`} className="text-17 text-accent">
              Show details
            </Link>
          </div>
        </div>
      </div>
      <div className="text-center">
        <ButtonComponent
          text="Book Car"
          isPrimary={true}
          className="shadow-button text-17 drop-shadow-2xl"
          // Use Onclick event for Adding the Booking Logic
        />
      </div>
    </div>
  )
}

export default CarDetails
