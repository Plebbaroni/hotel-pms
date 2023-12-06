import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import { AuthProvider } from "./contexts/AuthContext.jsx"


ReactDOM.createRoot(document.getElementById('root')).render(
  <div className='root'>
    <Router>
      <AuthProvider>
        <App/>
      </AuthProvider>
    </Router>
  </div>
)
