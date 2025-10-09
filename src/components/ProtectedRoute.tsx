import { Navigate } from 'react-router-dom'
import { useAuth } from '../util/AuthContext'
import { useEffect, useState } from 'react'
import { apiUrl } from '../util/apiUrl'
import axios from 'axios'
import type { ReactNode } from 'react'

interface ProtectedRouteProps {
  children: ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, loading, refreshUser } = useAuth()
  const [loginLoading, setLoginLoading] = useState(false)

  console.log(apiUrl)
  useEffect(() => {
    const autoLogin = async () => {
      const token = localStorage.getItem('token')
      if (!token && !loading && !isAuthenticated) {
        setLoginLoading(true)
        try {
          const response = await axios.post(`${apiUrl}/auth`, {
            username: 'Snow',
            password: 'beatrice-PW',
          })
          console.log(response)
          localStorage.setItem('token', response.data.token)
          await refreshUser()
        } catch (error) {
          console.error('Auto login failed:', error)
        } finally {
          setLoginLoading(false)
        }
      }
    }

    autoLogin()
  }, [loading, isAuthenticated, refreshUser])

  if (loading || loginLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 size-12 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600"></div>
          <p className="text-lg text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}
