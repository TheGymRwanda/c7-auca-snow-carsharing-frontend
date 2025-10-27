import { Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../util/AuthContext'
import { useEffect, type ReactNode } from 'react'

interface ProtectedRouteProps {
  children: ReactNode
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const navigate = useNavigate()

  const { isAuthenticated, loading } = useAuth()

  useEffect(() => {
    if (!isAuthenticated && !loading) {
      navigate('/landing')
    }
  }, [isAuthenticated, loading, navigate])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-primary">
        <div className="text-center">
          <div className="mx-auto mb-4 w-12 h-12 animate-spin rounded-full border-4 border-white/30 border-t-white"></div>
          <p className="text-lg text-white">Loading ...</p>
        </div>
      </div>
    )
  }

  return children
}

export default ProtectedRoute
