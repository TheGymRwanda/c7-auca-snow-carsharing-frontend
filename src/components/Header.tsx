import Logo from '../assets/Logo'
import ProfileIcon from '../assets/ProfileIcon'
export default function Header() {
  return (
    <>
      <header className="flex items-center justify-between p-1 bg-[#111827] text-[#F9FAFB]">
        <button className="" onClick={() => {}}>
          Menu
        </button>
        <Logo className="relative z-10" />
        <ProfileIcon />
        {/* eslint-disable-next-line tailwindcss/enforces-negative-arbitrary-values */}
        <div className="absolute z-1 ml-[50%] -translate-x-[50%] h-20 w-20 rounded-full bg-[#111827]"></div>
      </header>
    </>
  )
}
