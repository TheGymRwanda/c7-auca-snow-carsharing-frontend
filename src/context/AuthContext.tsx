import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { getAuthToken } from '../util/auth'
import { UserDto } from '../util/api'
import axios, { getErrorMessage } from '../util/apiClient'

interface AuthContextType {
  user: UserDto | null
  loading: boolean
  isAuthenticated: boolean
  logout: () => void
  refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserDto | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchUser = async () => {
    const token = getAuthToken()
    if (!token) {
      setLoading(false)
      return
    }

    try {
      const response = await axios.get<UserDto>('/auth')
      setUser(response.data)
    } catch (error) {
      console.error('Failed to fetch user:', getErrorMessage(error))
      localStorage.removeItem('token')
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUser()
  }, [])

  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        logout,
        refreshUser: fetchUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
