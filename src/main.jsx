import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import Prompts from './Prompts'
import './index.css'

// eslint-disable-next-line react-refresh/only-export-components
function Router() {
  const [page, setPage] = useState('home')

  useEffect(() => {
    const path = window.location.pathname
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (path.includes('prompts')) setPage('prompts')

    else setPage('home')
  }, [])

  return page === 'prompts' ? <Prompts /> : <App />
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>
)
