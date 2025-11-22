import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate, Link } from 'react-router-dom'
import { Logo } from '../assets'
import { apiUrl } from '../util/apiUrl'
import axios from 'axios'
import LoginForm from '../components/forms/Login'
import { BrandHeader } from '../components/ui/BrandHeader'

function Login() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { refreshUser } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await axios.post(`${apiUrl}/auth`, {
        username: (e.target as HTMLFormElement).username.value,
        password: (e.target as HTMLFormElement).password.value,
      })
      localStorage.setItem('token', response.data.token)
      try {
        await refreshUser()
        navigate('/')
      } catch (refreshError) {
        setError('Login successful but failed to load user data')
        localStorage.removeItem('token')
      }
    } catch (error) {
      setError('Invalid username or password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col gap-16 bg-primary-dark max-lg:items-center max-lg:justify-center max-lg:px-6 lg:flex-row">
      <div className="flex-col text-gray-100 lg:flex lg:w-1/2 lg:justify-center lg:px-20">
        <Link to="/" className="mb-10 hidden size-16 outline-none lg:grid ">
          <Logo className="size-full" />
        </Link>
        <BrandHeader />
        <h1 className="my-6 hidden font-lora text-2xl lg:block">
          Share your journey, share your car
        </h1>
        <p className="mb-24 hidden font-lora text-lg italic text-gray-300/90 lg:block">
          Join thousands of drivers making extra income while helping others get around sustainably.
        </p>
      </div>

      <div className="flex w-1/2 flex-col justify-center from-primary-light via-primary to-primary-dark max-lg:w-full max-lg:max-w-md lg:h-screen lg:rounded-l-full lg:bg-gradient-to-br lg:px-20">
        <h3 className="mb-8 text-center font-lora text-xl font-medium text-white lg:mb-12 lg:text-4xl">
          Log in
        </h3>
        <LoginForm handleSubmit={handleSubmit} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default Login
