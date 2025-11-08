import { ChevronBackIcon } from '../assets'
import { useNavigate } from 'react-router-dom'

function PageTitle({ title }: { title: string }) {
  const navigate = useNavigate()
  return (
    <div className="sticky top-14 z-10 flex w-full bg-primary px-4 pb-4 pt-6 text-center">
      <button onClick={() => navigate(-1)} className="cursor-pointer transition hover:opacity-80">
        <ChevronBackIcon className="h-5 w-5 text-accent" />
      </button>
      <div className="w-full text-center">
        <h1 className="font-lora text-3xl uppercase text-gray-200">{title}</h1>
      </div>
    </div>
  )
}

export default PageTitle
