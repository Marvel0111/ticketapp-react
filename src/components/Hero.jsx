import React from 'react';
import './Hero.css';
import heroWave from '../assets/hero-wave.svg';

export default function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      {/* Decorative Circles */}
      <div className="decorative-circle circle-1" aria-hidden="true"></div>
      <div className="decorative-circle circle-2" aria-hidden="true"></div>

      {/* Hero Content */}
      <div className="hero-content">
        <h1 id="hero-title">TicketApp</h1>
        <p>Manage tickets easily across teams — open, in progress, and closed.</p>

        <div className="hero-buttons">
          <a href="/auth/login" className="btn">Login</a>
          <a href="/auth/signup" className="btn btn-primary">Get Started</a>
        </div>
      </div>

      {/* Wavy Divider */}
      <img src={heroWave} alt="decorative wave" className="hero-wave" />
    </section>
  );
}
