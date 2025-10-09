import ButtonComponent from './buttonComponent'
import CarIcon from '../assets/CarIcon'
import ProfileIcon from '../assets/ProfileIcon'
import { Link } from 'react-router-dom'

interface ShowCarComponentProps {
  index: number | string
  title: string
  image: string
  owner: string
  location: string
}

export default function CarDetails({
  index,
  title,
  image,
  owner,
  location,
}: ShowCarComponentProps) {
  return (
    <div
      key={index}
      className="mt-8 flex w-full flex-col self-center rounded-2xl bg-[#3E7591] p-4 px-8"
      style={{ boxShadow: '0 8px 16px rgba(0,0,0,0.18)' }}
    >
      <div className="flex gap-6">
        <div className="my-1 ml-2 flex h-44 scale-[1.15] items-center justify-center">
          <img src={image} alt={`${title}'s Picture`} className="max-h-full" />
        </div>
        <div className="grid gap-4">
          <div className="grid gap-4">
            <h2 className="mt-2 whitespace-pre-line text-center text-xl leading-tight text-white">
              {title}
            </h2>
            <div className="flex flex-col gap-4 text-[18px] font-light text-gray-100">
              <div className="flex items-center gap-3">
                <ProfileIcon className="h-7 w-7" />
                <span>{owner}</span>
              </div>
              <div className="flex items-center gap-3">
                <CarIcon className="h-7 w-7" />
                <span>{location}</span>
              </div>
            </div>
          </div>
          <div className="mt-1 font-semibold">
            <Link to={`car/${index}`} className="text-[17px] text-[#F8FCAD]">
              Show details
            </Link>
          </div>
        </div>
      </div>
      <div className="text-center">
        <ButtonComponent
          text="Book Car"
          isPrimary={true}
          className="text-[17px] drop-shadow-2xl"
          style={{ boxShadow: '0 0px 10px rgba(0,0,0,0.18)' }}
          // Use Onclick event for Adding the Booking Logic
        />
      </div>
    </div>
  )
}
