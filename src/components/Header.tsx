import { useState } from 'react'
import { Link } from 'react-router-dom'
import Logo from '../assets/Logo'
import ProfileIcon from '../assets/ProfileIcon'
import DropDown from './DropDown'
export default function Header() {
  const [isDropDownOpen, setIsDropDownOpen] = useState<boolean>(false)
  return (
    <>
      <header className="relative flex items-center justify-between rounded-b-2xl bg-[#111827] p-1 px-4 text-[#F9FAFB]">
        <button className="" onClick={() => setIsDropDownOpen(!isDropDownOpen)}>
          {isDropDownOpen ? 'Close' : 'Menu'}
        </button>
        <Link to={'/'}>
          <Logo className={`relative z-10 ${isDropDownOpen ? 'ml-[22px]' : 'ml-5'}`} />
        </Link>
        <ProfileIcon />
        {/* eslint-disable-next-line tailwindcss/enforces-negative-arbitrary-values */}
        <div className="z-1 size-20 absolute ml-[50%] -translate-x-[50%] rounded-full bg-[#111827]"></div>
        {isDropDownOpen && <DropDown />}
      </header>
    </>
  )
}
