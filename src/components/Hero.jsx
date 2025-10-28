import React from 'react'
import wave from '../../shared-assets/hero-wave.svg'

export default function Hero(){
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="decorative-circle circle-1" aria-hidden="true"></div>
      <div className="decorative-circle circle-2" aria-hidden="true"></div>
      <div style={{position:'relative',zIndex:2}}>
        <h1 id="hero-title">TicketApp</h1>
        <p>Manage tickets across teams — open, in progress, and closed.</p>
        <div style={{marginTop:16}}>
          <a className="card" href="/auth/login" style={{marginRight:8}}>Login</a>
          <a className="card" href="/auth/signup">Get Started</a>
        </div>
      </div>
      <img src={wave} alt="decorative wave" style={{position:'absolute',bottom:0,left:0,right:0,width:'100%'}}/>
    </section>
  )
}
