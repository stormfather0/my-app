import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { HashRouter as Router } from 'react-router-dom'  // <-- change here
import { CartProvider } from './CartContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CartProvider>
      <Router basename="/my-app">  {/* you can keep the basename */}
        <App />
      </Router>
    </CartProvider>
  </React.StrictMode>
)