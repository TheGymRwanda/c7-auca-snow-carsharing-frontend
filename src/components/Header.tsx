import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ProfileIcon, Logo } from '../assets'
import DropDown from './DropDown'

export default function Header() {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false)
  const location = useLocation()
  const isLoginPage = location.pathname === '/login'

  const dropDownRef = useRef<HTMLDivElement>(null)
  const btnRef = useRef<HTMLButtonElement>(null)

  // close when clicking outside
  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!isDropDownOpen) return
      if (
        dropDownRef.current &&
        !dropDownRef.current.contains(e.target as Node) &&
        btnRef.current &&
        !btnRef.current.contains(e.target as Node)
      ) {
        setIsDropDownOpen(false)
      }
    }
    document.addEventListener('mousedown', onDocClick)
    return () => document.removeEventListener('mousedown', onDocClick)
  }, [isDropDownOpen])

  return (
    <header className=" relative overflow-visible grid grid-cols-[1fr_auto_1fr] items-center rounded-b-2xl bg-nav text-[#F9FAFB] px-4 py-2">
      <div className="flex items-center">
        {!isLoginPage && (
          <button
            ref={btnRef}
            onClick={() => setIsDropDownOpen(prev => !prev)}
            className="min-w-[64px] text-sm text-start"
          >
            {isDropDownOpen ? 'Close' : 'Menu'}
          </button>
        )}
      </div>

      <div className="relative flex ml-1.5 items-center justify-center">
        <Link to="/">
          <Logo className="relative z-10" />
        </Link>
        <div className=" absolute left-1/2 -translate-x-1/2 bottom-[-22px] h-20 w-20 rounded-full bg-nav z-0 " />
      </div>

      <div className="flex items-center justify-end cursor-pointer">
        <Link to="/profile">{!isLoginPage && <ProfileIcon />}</Link>
      </div>

      {isDropDownOpen && (
        <div ref={dropDownRef} className="absolute inset-x-1 top-full -mt-10 z-20">
          <DropDown />
        </div>
      )}
    </header>
  )
}
