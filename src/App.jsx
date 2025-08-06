import { useState } from 'react'
import { Routes, Route, Link } from "react-router"
import Dashboard from './pages/Dashboard/Dashboard.jsx'
import SettingPage from './pages/setting/Setting.jsx'
import Sidebar from './components/sidebar/Sidebar.jsx'

function App() {
  const [count, setCount] = useState(0)

  const NODE_ENV = process.env.NODE_ENV

  return (
    <>
      <Sidebar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/settings" element={<SettingPage />} />
      </Routes>
    </>
  )
}

export default App
