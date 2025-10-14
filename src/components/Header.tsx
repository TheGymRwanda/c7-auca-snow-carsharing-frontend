import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ProfileIcon, Logo } from '../assets/index'
import DropDown from './DropDown'
export default function Header() {
  const [isDropDownOpen, setIsDropDownOpen] = useState<boolean>(false)
  const location = useLocation()
  const isLoginPage = location.pathname === '/login'

  return (
    <>
      <header className="relative flex items-center justify-between rounded-b-2xl bg-nav p-1 px-4 text-[#F9FAFB]">
        {!isLoginPage && (
          <button className="" onClick={() => setIsDropDownOpen(!isDropDownOpen)}>
            {isDropDownOpen ? 'Close' : 'Menu'}
          </button>
        )}
        {isLoginPage && <div></div>}
        <Link to={'/'}>
          <Logo className={`relative z-10 ${isDropDownOpen ? 'ml-[22px]' : 'ml-5'}`} />
        </Link>
        {!isLoginPage && <ProfileIcon />}
        {isLoginPage && <div></div>}
        {/* eslint-disable-next-line tailwindcss/enforces-negative-arbitrary-values */}
        <div className="z-1 size-20 absolute ml-[50%] -translate-x-[50%] rounded-full bg-nav"></div>
        {isDropDownOpen && <DropDown />}
      </header>
    </>
  )
}
