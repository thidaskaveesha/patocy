import React from 'react'
import ChoosingRole from './pages/ChoosingRole'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<ChoosingRole />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
