import React from 'react'
import ChoosingRole from './pages/ChoosingRole'
import RegisterPageLookers from './pages/RegisterPageLookers'
import RegisterPageConsultants from './pages/RegisterPageConsultants'
import LoginPage from './pages/LoginPage'
import ForgotPassword from './pages/ForgotPassword'
import HomePageConsultants from './pages/HomePageConsultants'
import HomePageLookers from './pages/HomePageLookers'
import RoleDetails from './components/RoleDetails'
import ITIndustry from './components/ITIndustry'

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
          <Route path="/dashboard" element={<HomePageLookers />} />
          <Route path="/dashboard-consultants" element={<HomePageConsultants />} />
          <Route path="/roles" element={<ITIndustry />} />
          <Route path="/roles/:id" element={<RoleDetails />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
