import { useState } from 'react'
import { Routes, Route, Link } from "react-router"
import Login from './pages/login/Login.jsx'
import Dashboard from './pages/dashboard/Dashboard.jsx'
import SettingPage from './pages/setting/Setting.jsx'
import Sidebar from './components/sidebar/Sidebar.jsx'
import Navbar from './components/navbar/Navbar.jsx'
import TodoApp from './pages/todo-app/TodoApp.jsx'
import ProtectedRoute from './utils/ProtectedRoute.jsx'
import './assets/App.scss'

function App() {
  const [count, setCount] = useState(0)

  const NODE_ENV = process.env.NODE_ENV

  return (
    <>
      {/* <Navbar />
      <Sidebar /> */}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/settings" element={<ProtectedRoute><SettingPage /></ProtectedRoute>} />
        <Route path="/todo-app" element={<TodoApp />} />
        <Route path="*" element={<p>404!</p>} />
      </Routes>
    </>
  )
}

export default App
