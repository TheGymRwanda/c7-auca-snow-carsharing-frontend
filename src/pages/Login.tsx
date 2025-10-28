import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ProfileIcon, KeyIcon } from '../assets'
import { useAuth } from '../context/AuthContext'
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
    <div className="flex min-h-screen flex-col items-center justify-center gap-16 bg-primary-dark px-6">
      <div className="text-center font-lora text-gray-100">
        <h1 className="mt-3 text-5xl font-bold">MONI</h1>
        <h2 className="mb-6 text-5xl italic">Share</h2>
      </div>

      <div className="w-full max-w-sm">
        <h3 className="mb-8 text-center font-lora text-xl font-medium text-white">Log in</h3>

        <form onSubmit={handleSubmit} className="space-y-14">
          <div className="space-y-3">
            <div className="relative">
              <ProfileIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-white" />
              <input
                type="text"
                placeholder="Username / e-mail"
                value={username}
                onChange={e => setUsername(e.target.value)}
                className="w-full rounded-full border-none bg-white/20 py-3 pl-12 pr-4 text-white outline-none placeholder:text-white/70"
                required
              />
            </div>

            <div className="relative">
              <KeyIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 stroke-white" />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full rounded-full border-none bg-white/20 py-3 pl-12 pr-4 text-white outline-none placeholder:text-white/70"
                required
              />
            </div>
          </div>

          {error && <p className="text-center text-sm text-red-200">{error}</p>}

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
