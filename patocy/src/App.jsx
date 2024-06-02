import React from 'react'
import ChoosingRole from './pages/ChoosingRole'
import LoginPage from './pages/LoginPage'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
