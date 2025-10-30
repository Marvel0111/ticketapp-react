import React, { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext()
const SESSION_KEY = 'ticketapp_session'
const USERS_KEY = 'ticketapp_users'

// Simulated delay to mimic API calls
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

function getStoredUsers() {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY)) || []
  } catch {
    return []
  }
}

export function AuthProvider({ children }){
  const [session, setSession] = useState(()=>{
    try { return JSON.parse(localStorage.getItem(SESSION_KEY)) } catch { return null }
  })
  const [sessionExpired, setSessionExpired] = useState(false)

  useEffect(()=>{
    if(session) localStorage.setItem(SESSION_KEY, JSON.stringify(session))
    else localStorage.removeItem(SESSION_KEY)
  },[session])

  // Auto-logout when session expires
  useEffect(()=>{
    if(!session) return
    const EXPIRE_MS = 1000 * 60 * 60 // 1 hour
    const created = new Date(session.createdAt).getTime()
    const expiresAt = created + EXPIRE_MS
    const now = Date.now()
    const msLeft = Math.max(0, expiresAt - now)
    const t = setTimeout(()=>{
      setSession(null)
      setSessionExpired(true)
    }, msLeft)
    return ()=> clearTimeout(t)
  },[session])

  async function login({ email, password }) {
    await delay(600) // Simulate network latency
    
    const users = getStoredUsers()
    const user = users.find(u => u.email === email)
    
    if (!user) {
      throw new Error('No account found with this email')
    }
    
    if (user.password !== password) {
      throw new Error('Invalid password')
    }
    
    const token = Math.random().toString(36).slice(2)
    const s = { 
      token,
      user: { id: user.id, name: user.name, email: user.email },
      createdAt: new Date().toISOString()
    }
    setSession(s)
    return s
  }

  async function signup({ name, email, password }) {
    await delay(800) // Simulate network latency
    
    const users = getStoredUsers()
    if (users.some(u => u.email === email)) {
      throw new Error('An account with this email already exists')
    }
    
    const newUser = {
      id: `user-${Date.now()}`,
      name,
      email,
      password,
      createdAt: new Date().toISOString()
    }
    
    users.push(newUser)
    localStorage.setItem(USERS_KEY, JSON.stringify(users))
    
    return login({ email, password })
  }

  function logout() {
    setSession(null)
  }

  function clearSessionExpired(){ setSessionExpired(false) }

  const value = {
    session,
    isAuthenticated: !!session,
    sessionExpired,
    clearSessionExpired,
    login,
    signup,
    logout
  }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth(){
  return useContext(AuthContext)
}
