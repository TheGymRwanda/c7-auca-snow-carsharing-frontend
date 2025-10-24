import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ProfileIcon, Logo } from '../assets'
import DropDown from './DropDown'
import { useAuth } from '../util/context/AuthContext'

export default function Header() {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false)
  const location = useLocation()
  const { isAuthenticated } = useAuth()
  const isPublicPage = location.pathname === '/login' || location.pathname === '/landing'

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

  useEffect(() => {
    if (!isAuthenticated) setIsDropDownOpen(false)
  }, [isAuthenticated])

  return (
    <header className=" relative grid grid-cols-[1fr_auto_1fr] items-center overflow-visible rounded-b-2xl bg-nav px-4 py-2 text-[#F9FAFB]">
      <div className="flex items-center">
        {!isPublicPage && (
          <button
            ref={btnRef}
            onClick={() => setIsDropDownOpen(prev => !prev)}
            className="min-w-[64px] text-start text-sm"
          >
            {isDropDownOpen ? 'Close' : 'Menu'}
          </button>
        )}
      </div>

      <div className="relative ml-1.5 flex items-center justify-center">
        <Link to="/">
          <Logo className="relative z-10" />
        </Link>
        <div className=" absolute bottom-[-22px] left-1/2 z-0 h-20 w-20 -translate-x-1/2 rounded-full bg-nav " />
      </div>

      <div className="flex items-center justify-end">{!isPublicPage && <ProfileIcon />}</div>

      {isDropDownOpen && (
        <div ref={dropDownRef} className="absolute inset-x-1 top-full z-20 -mt-10">
          <DropDown />
        </div>
      )}
    </header>
  )
}
