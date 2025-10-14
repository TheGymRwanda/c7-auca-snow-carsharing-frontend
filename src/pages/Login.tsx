import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ProfileIcon, LockIcon } from '../assets'
import { useAuth } from '../util/AuthContext'
import { apiUrl } from '../util/apiUrl'
import axios from 'axios'

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
      await refreshUser()
      navigate('/')
    } catch (error) {
      setError('Invalid username or password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary to-primary-light flex flex-col items-center justify-center px-6 pt-20">
      <div className="text-center mb-12">
        <h1 className="text-white text-4xl font-bold mb-2">MONI</h1>
        <h2 className="text-white text-3xl font-light italic">share</h2>
      </div>

      <div className="w-full max-w-sm">
        <h3 className="text-white text-lg font-medium text-center mb-8">Log in</h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <ProfileIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white w-5 h-5" />
            <input
              type="text"
              placeholder="Username / e-mail"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-white/20 text-white placeholder-white/70 rounded-full py-3 pl-12 pr-4 border-none outline-none"
              required
            />
          </div>

          <div className="relative">
            <LockIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white w-5 h-5" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/20 text-white placeholder-white/70 rounded-full py-3 pl-12 pr-4 border-none outline-none"
              required
            />
          </div>

          {error && (
            <p className="text-red-200 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-primary font-medium py-3 rounded-full mt-8 hover:bg-gray-100 transition-colors disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Log in'}
          </button>
        </form>
      </div>
    </div>
  )
}