import { useState } from 'react'
import Logo from '../assets/Logo'
import ProfileIcon from '../assets/ProfileIcon'
import DropDown from './DropDown'
export default function Header() {
  const [isDropDownOpen, setIsDropDownOpen] = useState<boolean>(false)
  return (
    <>
      <header className="flex items-center justify-between rounded-b-lg bg-[#111827] p-1 text-[#F9FAFB]">
        <button className="" onClick={() => setIsDropDownOpen(!isDropDownOpen)}>
          {isDropDownOpen ? 'Close' : 'Menu'}
        </button>
        <Logo className="relative z-10" />
        <ProfileIcon />
        {/* eslint-disable-next-line tailwindcss/enforces-negative-arbitrary-values */}
        <div className="z-1 size-20 absolute ml-[50%] -translate-x-[50%] rounded-full bg-[#111827]"></div>
        {isDropDownOpen && <DropDown />}
      </header>
    </>
  )
}
