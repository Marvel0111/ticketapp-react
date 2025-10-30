import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Hero from '../components/Hero'
import toast from 'react-hot-toast'

export default function Landing() {
  const [loading, setLoading] = useState(false)

  function handleGetStarted() {
    setLoading(true)
    // Simulate a slight delay for UI feedback
    setTimeout(() => {
      setLoading(false)
      toast.success('Welcome! Create an account to get started.')
    }, 300)
  }
  return (
    <div>
      <Hero />

      <div className="container">

      <section className="landing-features" aria-labelledby="features-title">
        <h2 id="features-title" className="section-title">Features</h2>
        
        <div className="grid grid-3">
          <div className="card">
            <h3>Seamless Tracking</h3>
            <p>Track tickets from open to closed with intuitive status updates.</p>
          </div>

          <div className="card">
            <h3>Team Access</h3>
            <p>Share and collaborate on tickets across your entire team.</p>
          </div>

          <div className="card">
            <h3>Real-time Updates</h3>
            <p>See changes instantly with real-time status notifications.</p>
          </div>
        </div>
      </section>

      <section className="landing-cta" aria-labelledby="cta-title">
        <div className="card" style={{ textAlign: 'center', padding: '48px 24px', marginTop: '48px' }}>
          <h2 id="cta-title">Ready to streamline your workflow?</h2>
          <p style={{ margin: '16px 0' }}>Join teams already using TicketApp to manage their tickets effectively.</p>
          
          <div className="cta-buttons" style={{ marginTop: '24px' }}>
            <Link to="/auth/login" className="btn" style={{ marginRight: '12px' }}>
              Login
            </Link>
            <Link 
              to="/auth/signup" 
              className="btn btn-primary"
              onClick={handleGetStarted}
              aria-disabled={loading}
            >
              {loading ? 'Loading...' : 'Get Started Free'}
            </Link>
          </div>
        </div>
      </section>
      </div>
    </div>
  )
}
