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
      setPage(path.includes('prompts') ? 'prompts' : 'home')
    }
    
    handleNavigation()
    window.addEventListener('popstate', handleNavigation)
    return () => window.removeEventListener('popstate', handleNavigation)
  }, [])

  const navigate = (path) => {
    window.history.pushState(null, '', path)
    setPage(path.includes('prompts') ? 'prompts' : 'home')
  }

  return page === 'prompts' ? <Prompts navigate={navigate} /> : <App navigate={navigate} />
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>
)
