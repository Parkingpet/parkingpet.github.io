import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import Prompts from './Prompts'
import './index.css'

function Router() {
  const [page, setPage] = useState('home')

  useEffect(() => {
    const handleNavigation = () => {
      const path = window.location.pathname
      setPage(path.endsWith('prompts') || path.endsWith('prompts/') ? 'prompts' : 'home')
    }
    
    handleNavigation()
    window.addEventListener('popstate', handleNavigation)
    return () => window.removeEventListener('popstate', handleNavigation)
  }, [])

  return page === 'prompts' ? <Prompts /> : <App />
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>
)
