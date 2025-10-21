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
      className="mt-8 flex w-full min-h-60 flex-col self-center rounded-2xl bg-primary-light p-4 px-8 shadow-card"
    >
      <div className="grid grid-cols-2 gap-20">
        <div className="my-1 flex w-52 items-center justify-center pr-4">
          <img src={image} alt={`${title}'s Picture`} className="max-h-full" />
        </div>
        <div className="flex flex-col min-h-52 justify-around gap-4">
          <div className="flex flex-col gap-4">
            <h2 className="mt-2 whitespace-normal overflow-wrap-anywhere text-xl leading-tight font-lora text-white">
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
          <div className="mb-4 font-semibold">
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
