import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import toast from 'react-hot-toast'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const nav = useNavigate()

  function validateForm() {
    const newErrors = {}
    if (!email) {
      newErrors.email = 'Email is required'
    } else if (!EMAIL_REGEX.test(email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    if (!password) {
      newErrors.password = 'Password is required'
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!validateForm()) return

    setLoading(true)
    try {
      await login({ email, password })
      toast.success('Welcome back!')
      nav('/dashboard')
    } catch (err) {
      toast.error(err.message || 'Failed to login. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Welcome back</h1>
        <p className="auth-subtitle">Login to manage your tickets</p>

        <form onSubmit={handleSubmit} noValidate className="auth-form">
          <div className="form-group">
            <label htmlFor="email" className="form-label">Email address</label>
            <input
              id="email"
              type="email"
              className={`form-input ${errors.email ? 'form-input-error' : ''}`}
              value={email}
              onChange={e => {
                setEmail(e.target.value)
                if (errors.email) setErrors({...errors, email: ''})
              }}
              disabled={loading}
              required
              aria-describedby={errors.email ? 'email-error' : undefined}
            />
            {errors.email && (
              <div id="email-error" className="error-text" role="alert">
                {errors.email}
              </div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              id="password"
              type="password"
              className={`form-input ${errors.password ? 'form-input-error' : ''}`}
              value={password}
              onChange={e => {
                setPassword(e.target.value)
                if (errors.password) setErrors({...errors, password: ''})
              }}
              disabled={loading}
              required
              minLength={6}
              aria-describedby={errors.password ? 'password-error' : undefined}
            />
            {errors.password && (
              <div id="password-error" className="error-text" role="alert">
                {errors.password}
              </div>
            )}
          </div>

          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="auth-footer">
          Don't have an account?{' '}
          <Link to="/auth/signup">Sign up</Link>
        </p>
      </div>
    </div>
  )
}