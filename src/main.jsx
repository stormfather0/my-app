import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter as Router } from 'react-router-dom'
import { CartProvider } from './CartContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CartProvider>
      <Router basename="/react-app">
        <App />
      </Router>
    </CartProvider>
  </React.StrictMode>
)