
import Sidebar from '../../components/sidebar/Sidebar.jsx'
import Navbar from '../../components/navbar/Navbar.jsx'
import './assets/Dashboard.scss'

export default function Dashboard() {
  return (
    <>
      <div className="app-container">
        <Navbar />
        <Sidebar />
        <div className="main-content">
          <h1>dashboard</h1>
          <p>This is the dashboard page of the application.</p>
          <p>Welcome to the dashboard!</p>
        </div>
      </div>
    </>
  )
}

