// src/main.jsx (Modified Content)

import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* 👈 Set the basename using the Vite environment variable */}
    <BrowserRouter basename={import.meta.env.BASE_URL}> 
      <App />
    </BrowserRouter>
  </React.StrictMode>
)