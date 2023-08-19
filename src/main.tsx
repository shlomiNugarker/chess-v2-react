import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App.tsx'

import './assets/scss/global.scss'

import { HashRouter as Router } from 'react-router-dom'
import { AuthContextProvider } from './context/AuthContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </Router>
  </React.StrictMode>
)
