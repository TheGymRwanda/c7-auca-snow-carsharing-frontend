import Logo from '../assets/Logo'
import ProfileIcon from '../assets/ProfileIcon'
export default function Header() {
  return (
    <>
      <header className="flex bg-[#111827] text-[#F9FAFB] items-center justify-between p-1">
        <button className="" onClick={() => {}}>
          Menu
        </button>
        <Logo className="relative z-10" />
        <ProfileIcon />
        <div className="bg-[#111827] absolute h-20 w-20 rounded-full ml-[50%] -translate-x-[50%] z-1"></div>
      </header>
    </>
  )
}
