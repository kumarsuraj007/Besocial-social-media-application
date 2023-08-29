import './index.css'
import React from 'react'
import App from './App.jsx'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { UserProvider } from './context/user.context'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <UserProvider>
    <App />
    </UserProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
