import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { apiUrl } from '../util/apiUrl'
import axios from 'axios'
import LoginForm from '../components/forms/LoginForm'
import { BrandHeader } from '../components/ui/BrandHeader'

export default function Login() {
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
    <div className="mt-28 flex flex-col items-center justify-start gap-16 bg-primary-dark px-6">
      <BrandHeader />

      <div className="w-full max-w-sm">
        <h3 className="mb-8 text-center font-lora text-xl font-medium text-white">Log in</h3>
        <LoginForm handleSubmit={handleSubmit} loading={loading} error={error} />
      </div>
    </div>
  )
}
