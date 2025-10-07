import Logo from '../assets/Logo'
import ProfileIcon from '../assets/ProfileIcon'
export default function Header() {
  return (
    <>
      <header className="relative flex items-center justify-between rounded-b-2xl bg-[#111827] p-1 px-4 text-[#F9FAFB]">
        <button className="" onClick={() => {}}>
          Menu
        </button>
        <div className="absolute w-16 h-14 left-[43.7%] top-[18px] rounded-full bg-[#111827]" />
        <Logo className="relative mt-2 z-10" />
        <ProfileIcon />
        {/* eslint-disable-next-line tailwindcss/enforces-negative-arbitrary-values */}
        <div className="z-1 absolute ml-[50%] size-20 -translate-x-[50%] rounded-full bg-[#111827]"></div>
      </header>
    </>
  )
}
