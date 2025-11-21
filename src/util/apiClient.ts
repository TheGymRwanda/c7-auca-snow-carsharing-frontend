import axios from 'axios'
import { apiUrl } from './apiUrl'
import { getAuthToken } from './auth'

axios.defaults.baseURL = apiUrl

axios.interceptors.request.use(config => {
  const token = getAuthToken()
  if (token) {
    config.headers = config.headers ?? {}
    if (!config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${token}`
    }
  }
  return config
})

export function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as { message?: string } | undefined
    if (data?.message) return data.message
    if (error.message) return error.message
  }

  if (error instanceof Error && error.message) {
    return error.message
  }

  return 'An unexpected error occurred. Please try again.'
}

export default axios
