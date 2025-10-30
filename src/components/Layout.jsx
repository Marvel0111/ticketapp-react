import { Toaster } from 'react-hot-toast'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function Layout({ children }) {
  const { isAuthenticated, logout } = useAuth()
  const nav = useNavigate()
  function handleLogout(){
    logout()
    nav('/')
  }
  return (
    <div>
      <Toaster position="top-right" toastOptions={{
        success: { duration: 3000 },
        error: { duration: 4000 },
        style: { background: 'var(--color-card)', borderRadius: '8px', boxShadow: 'var(--shadow)' }
      }} />
      
      <header className="container header" role="banner">
        <div>
          <Link to="/" aria-label="TicketApp Home"><strong>TicketApp</strong></Link>
        </div>
        <nav className="nav" aria-label="Main navigation">
          {!isAuthenticated && <Link to="/auth/login">Login</Link>}
          {!isAuthenticated && <Link to="/auth/signup">Get Started</Link>}
          {isAuthenticated && <Link to="/dashboard">Dashboard</Link>}
          {isAuthenticated && <Link to="/tickets">Tickets</Link>}
          {isAuthenticated && <button onClick={handleLogout} style={{marginLeft:12}}>Logout</button>}
        </nav>
      </header>

      <main className="container" role="main">{children}</main>

      <footer className="container footer" role="contentinfo">
        <small>© {new Date().getFullYear()} TicketApp — Built for Frontend Stage 2</small>
      </footer>
    </div>
  )
}
