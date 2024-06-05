import React from 'react'
import ChoosingRole from './pages/ChoosingRole'
import RegisterPageLookers from './pages/RegisterPageLookers'
import RegisterPageConsultants from './pages/RegisterPageConsultants'
import LoginPage from './pages/LoginPage'
import ForgotPassword from './pages/ForgotPassword'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/choosing-role" element={<ChoosingRole />} />
          <Route path="/reset-password" element={<ForgotPassword />} />
          <Route path="/register-lookers" element={<RegisterPageLookers />} />
          <Route path="/register-consultants" element={<RegisterPageConsultants />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
