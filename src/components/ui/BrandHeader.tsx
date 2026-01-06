import { Link } from 'react-router-dom'
import { Logo } from '../../assets'
interface BrandHeaderType {
  open?: boolean
  variant?: 'default' | 'sidebar'
}
export function BrandHeader({ variant = 'default', open }: BrandHeaderType) {
  if (variant === 'sidebar') {
    return (
      <div className="flex items-center justify-center gap-2 px-6 2xl:py-6">
        {open && <span className="border-b border-white/30 pb-2 font-lora text-2xl">MONI</span>}
        <Link to="/" className="flex items-center gap-3 pt-6 lg:gap-4">
          <div
            className={`rounded-full border-b-2 border-white/30 px-3 py-6 ${open ? 'bg-nav' : ''}`}
          >
            <Logo />
          </div>
        </Link>
        {open && (
          <span className="border-b border-white/30 pb-2 font-lora text-2xl italic">Share</span>
        )}
      </div>
    )
  } else {
    return (
      <div className="text-center font-lora text-5xl lg:text-start lg:text-6xl">
        <h1 className="mt-3 font-bold">MONI</h1>
        <h2 className="mb-6 italic lg:mb-8 lg:ml-14">Share</h2>
      </div>
    )
  }
}
