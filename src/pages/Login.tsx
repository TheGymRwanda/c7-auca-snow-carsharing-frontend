import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { ProfileIcon, KeyIcon, Logo } from '../assets'
import { useAuth } from '../util/AuthContext'
import { apiUrl } from '../util/apiUrl'
import axios from 'axios'
import ButtonComponent from '../components/ui/Button'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
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
        username,
        password,
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
    <div className="min-h-screen bg-primary-dark flex flex-col lg:flex-row max-lg:items-center max-lg:justify-center max-lg:px-6 gap-16">
      <div className="lg:flex flex-col text-gray-100 lg:justify-center lg:w-1/2 lg:px-20">
        <Link to="/" className="mb-16 hidden lg:block">
          <Logo className="h-16 w-16" />
        </Link>
        <div className="text-center lg:text-start text-5xl lg:text-6xl font-lora">
          <h1 className="mt-3 font-bold">MONI</h1>
          <h2 className="mb-6 lg:ml-14 italic">Share</h2>
        </div>
        <h1 className="font-lora text-2xl my-6 hidden lg:block">Share your journey, share your car</h1>
        <p className="font-lora text-lg mb-24 italic text-gray-300/90 hidden lg:block">
          Join thousands of drivers making extra income while helping others get around sustainably.
        </p>
      </div>

      <div className="max-lg:w-full max-md:max-w-sm w-1/2 lg:px-20 flex flex-col justify-center lg:h-screen lg:bg-gradient-to-br from-primary-light via-primary to-primary-dark lg:rounded-l-full">
        <h3 className="text-white text-xl lg:text-4xl font-medium text-center mb-8 lg:mb-12 font-lora">Log in</h3>

        <form onSubmit={handleSubmit} className="space-y-14">
          <div className="space-y-3">
            <div className="relative">
              <ProfileIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white w-5 h-5" />
              <input
                type="text"
                placeholder="Username / e-mail"
                value={username}
                onChange={e => setUsername(e.target.value)}
                className="w-full bg-white/20 text-white placeholder-white/70 rounded-full py-3 pl-12 pr-4 border-none outline-none"
                required
              />
            </div>

            <div className="relative">
              <KeyIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 stroke-white w-5 h-5" />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full bg-white/20 text-white placeholder-white/70 rounded-full py-3 pl-12 pr-4 border-none outline-none"
                required
              />
            </div>
          </div>

          {error && <p className="text-red-200 text-sm text-center">{error}</p>}

          <ButtonComponent
            text="Login"
            isPrimary={true}
            loadingText="Logging In ..."
            loading={loading}
          />
        </form>
      </div>
    </div>
  )
}
