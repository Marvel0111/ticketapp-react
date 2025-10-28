import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Landing from './pages/Landing'
import Login from './pages/auth/Login'
import Signup from './pages/auth/Signup'
import Dashboard from './pages/Dashboard'
import TicketList from './pages/tickets/TicketList'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { TicketProvider } from './contexts/TicketContext'

import toast from 'react-hot-toast'

function ProtectedRoute({ children }) {
  const { isAuthenticated, sessionExpired, clearSessionExpired } = useAuth()
  if (!isAuthenticated) {
    if(sessionExpired){ toast.error('Your session has expired — please log in again.'); clearSessionExpired() }
    return <Navigate to="/auth/login" replace />
  }
  return children
}

export default function App() {
  return (
    <AuthProvider>
      <TicketProvider>
        <Layout>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/signup" element={<Signup />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/tickets"
            element={
              <ProtectedRoute>
                <TicketList />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        </Layout>
      </TicketProvider>
    </AuthProvider>
  )
}
