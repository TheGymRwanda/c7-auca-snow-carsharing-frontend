import './index.css'

import App from './App'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { AuthProvider } from './util/AuthContext'

const rootElement = document.getElementById('root')
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <AuthProvider>
        <App />
      </AuthProvider>
    </StrictMode>,
  )
}
