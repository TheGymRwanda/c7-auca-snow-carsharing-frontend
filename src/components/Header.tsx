import Logo from '../assets/Logo'
import ProfileIcon from '../assets/ProfileIcon'
export default function Header() {
  return (
    <>
      <header className="flex items-center justify-between rounded-b-lg bg-[#111827] p-1 text-[#F9FAFB]">
        <button className="" onClick={() => {}}>
          Menu
        </button>
        <Logo className="relative z-10" />
        <ProfileIcon />
        {/* eslint-disable-next-line tailwindcss/enforces-negative-arbitrary-values */}
        <div className="z-1 absolute ml-[50%] size-20 -translate-x-[50%] rounded-full bg-[#111827]"></div>
      </header>
    </>
  )
}
