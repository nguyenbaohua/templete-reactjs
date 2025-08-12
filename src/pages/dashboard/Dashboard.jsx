
import Sidebar from '../../components/sidebar/Sidebar.jsx'
import Navbar from '../../components/navbar/Navbar.jsx'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import './assets/Dashboard.scss'
import { selectCurrentUser } from '../../store/slices/authSlice.js'
import { logout } from '../../store/slices/authSlice.js'

export default function Dashboard() {
  const user = useSelector(selectCurrentUser)
  const dispatch = useDispatch()
  const navigator = useNavigate()

  const handleLogout = () => {
    dispatch(logout())
    navigator('/login')
  }
  return (
    <>
      <div className="app-container">
        {/* <Navbar />
        <Sidebar /> */}
        <div className="main-content">
          <h1>dashboard</h1>
          <p>Your email is: {user ? user.email : 'Guest'}</p>
          <p>Your role is: {user ? user.role : 'Guest'}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </>
  )
}

