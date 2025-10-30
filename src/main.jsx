// src/main.jsx (Restructured Content)

import React from 'react'
import { createRoot } from 'react-dom/client'
// 1. Change the import from BrowserRouter to HashRouter
import { HashRouter } from 'react-router-dom'
import App from './App'
import './index.css'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* 2. Change the component to HashRouter */}
    {/* The 'basename' prop is no longer needed with HashRouter */}
    <HashRouter> 
      <App />
    </HashRouter>
  </React.StrictMode>
)