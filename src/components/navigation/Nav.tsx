import { Link } from 'react-router-dom'

interface NavProps {
  to: string
  icon: React.ReactNode
  label: string
  open: boolean
  variant?: 'sidebar' | 'dropdown'
}

const Nav: React.FC<NavProps> = ({ to, icon, label, open, variant = 'sidebar' }) => {
  const isSidebar = variant === 'sidebar'

  const linkClass = isSidebar
    ? 'flex items-center gap-4 border-b border-white/20 px-3 py-4 hover:bg-primary-light-hover/20 truncate'
    : 'flex items-center gap-2 p-2 hover:bg-primary-light-hover'

  const iconContainerClass = isSidebar
    ? open
      ? 'flex-none mr-2'
      : 'flex-none mx-auto'
    : 'flex-none'

  return (
    <Link to={to} className={linkClass}>
      <div className={iconContainerClass}>{icon}</div>
      {isSidebar ? (
        open && <span className="block">{label}</span>
      ) : (
        <span className="block">{label}</span>
      )}
    </Link>
  )
}

export default Nav
