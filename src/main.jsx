
import React from 'react'
import { createRoot } from 'react-dom/client'
import './styles/globals.css'
import './styles/terminal.css'
import './styles/animations.css'
import App from './app/App.jsx'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
