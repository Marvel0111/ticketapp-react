import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import toast from 'react-hot-toast'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function Signup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const { signup } = useAuth()
  const nav = useNavigate()

  function validateForm() {
    const newErrors = {}
    if (!name) {
      newErrors.name = 'Name is required'
    } else if (name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters'
    }
    
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
      await signup({ name, email, password })
      toast.success('Account created! Welcome to TicketApp.')
      nav('/dashboard')
    } catch (err) {
      toast.error(err.message || 'Failed to create account. Please try again.')
    } finally {
      setLoading(false)
    }
    }

    return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Create account</h1>
        <p className="auth-subtitle">Get started with TicketApp</p>

        <form onSubmit={handleSubmit} noValidate className="auth-form">
          <div className="form-group">
            <label htmlFor="name" className="form-label">Full name</label>
            <input
              id="name"
              type="text"
              className={`form-input ${errors.name ? 'form-input-error' : ''}`}
              value={name}
              onChange={e => {
                setName(e.target.value)
                if (errors.name) setErrors({...errors, name: ''})
              }}
              disabled={loading}
              required
              aria-describedby={errors.name ? 'name-error' : undefined}
            />
            {errors.name && (
              <div id="name-error" className="error-text" role="alert">
                {errors.name}
              </div>
            )}
          </div>

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
            {loading ? 'Creating account...' : 'Create account'}
          </button>
        </form>

        <p className="auth-footer">
          Already have an account?{' '}
          <Link to="/auth/login">Login</Link>
        </p>
      </div>
    </div>
  )
}