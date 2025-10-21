import { useEffect, useState, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ProfileIcon, Logo } from '../assets/index'
import DropDown from './DropDown'
export default function Header() {
  const [isDropDownOpen, setIsDropDownOpen] = useState<boolean>(false)
  const location = useLocation()
  const dropDownRef = useRef<HTMLElement>(null)
  const btnRef = useRef<HTMLButtonElement>(null)
  const isLoginPage = location.pathname === '/login'

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (!dropDownRef.current || !btnRef.current) return
      if (
        isDropDownOpen &&
        !dropDownRef.current.contains(e.target as Node) &&
        !btnRef.current.contains(e.target as Node)
      ) {
        setIsDropDownOpen(false)
      }
    }

    document.addEventListener('click', handleClickOutside)

    return () => document.removeEventListener('click', handleClickOutside)
  }, [isDropDownOpen])

  return (
    <>
      <header className="relative flex items-center justify-between rounded-b-2xl bg-nav p-1 px-4 text-[#F9FAFB]">
        {!isLoginPage && (
          <button ref={btnRef} className="" onClick={() => setIsDropDownOpen(!isDropDownOpen)}>
            {isDropDownOpen ? 'Close' : 'Menu'}
          </button>
        )}
        {isLoginPage && <div></div>}
        <Link to={'/'}>
          <Logo className={`relative z-10`} />
        </Link>
        {!isLoginPage && <ProfileIcon />}
        {isLoginPage && <div></div>}
        {/* eslint-disable-next-line tailwindcss/enforces-negative-arbitrary-values */}
        <div className="z-1 size-20 absolute justify-self-center rounded-full bg-nav"></div>
        {isDropDownOpen && <DropDown dropDownRef={dropDownRef} />}
      </header>
    </>
  )
}
