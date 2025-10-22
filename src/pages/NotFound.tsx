import { ErrorPageIcon } from '../assets/index'
import ButtonComponent from '../components/ui/Button'
import { Link } from 'react-router-dom'

const NotFound = () => (
  <div className="flex min-h-screen items-center justify-center bg-primary-dark font-lora">
    <div className="p-4">
      <h1 className="mb-6 text-center text-4xl font-bold text-white">OOOOOPS!</h1>
      <div className="mx-7">
        <ErrorPageIcon />
      </div>
      <p className="mb-12 mt-6 text-center text-lg text-white">
        Something went wrong.
        <br />
        Try something else until we fix it.
      </p>
      <Link to="/">
        <ButtonComponent text="Go back" isPrimary={true} />
      </Link>
    </div>
  </div>
)

export default NotFound
