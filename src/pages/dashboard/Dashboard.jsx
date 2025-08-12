import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import './assets/Dashboard.scss'
import { selectCurrentUser } from '../../store/slices/authSlice.js'
import { selectVehicles } from '../../store/slices/vehiclesSlice.js';
import { logout } from '../../store/slices/authSlice.js'
import api from '../../api/api'

export default function Dashboard() {
  const user = useSelector(selectCurrentUser)
  // const vehicles = useSelector(selectVehicles)
  const dispatch = useDispatch()
  const navigator = useNavigate()

  const companies = [
    { id: '1', name: 'Company A' },
    { id: '2', name: 'Company B' },
  ]
  const locations = [
    { id: '1', name: 'Location X' },
    { id: '2', name: 'Location Y' },
  ]

  // const [companyId, setCompanyId] = useState(companies[0].id)
  // const [locationId, setLocationId] = useState(locations[0].id)

  const handleLogout = () => {
    dispatch(logout())
    navigator('/login')
  }

  const handleFetchVehicles = async () => {
    try {
      const response = await api.post('/vehicles', { company_id: companyId, location_id: locationId })
      dispatch(setVehicles(response.data.data || []))
    } catch (err) {
      console.error('error:', err)
      
      const defaultVehicles = [
        { id: 'demo-1', name: 'Demo Car', type: 'Sedan' },
        { id: 'demo-2', name: 'Demo Truck', type: 'Truck' },
        { id: 'demo-3', name: 'Demo Bus', type: 'Bus' },
      ]
      dispatch(setVehicles(defaultVehicles))
    }
  }

  const vehicles = [
    { id: 'demo-1', name: 'Demo Car', type: 'Sedan' },
    { id: 'demo-2', name: 'Demo Truck', type: 'Truck' },
    { id: 'demo-3', name: 'Demo Bus', type: 'Bus' },
    { id: 'demo-1', name: 'Demo Car', type: 'Sedan' },
    { id: 'demo-2', name: 'Demo Truck', type: 'Truck' },
    { id: 'demo-3', name: 'Demo Bus', type: 'Bus' },
    { id: 'demo-1', name: 'Demo Car', type: 'Sedan' },
    { id: 'demo-2', name: 'Demo Truck', type: 'Truck' },
    { id: 'demo-3', name: 'Demo Bus', type: 'Bus' },
    { id: 'demo-1', name: 'Demo Car', type: 'Sedan' },
    { id: 'demo-2', name: 'Demo Truck', type: 'Truck' },
    { id: 'demo-3', name: 'Demo Bus', type: 'Bus' },
    { id: 'demo-1', name: 'Demo Car', type: 'Sedan' },
    { id: 'demo-2', name: 'Demo Truck', type: 'Truck' },
    { id: 'demo-3', name: 'Demo Bus', type: 'Bus' },
    { id: 'demo-1', name: 'Demo Car', type: 'Sedan' },
    { id: 'demo-2', name: 'Demo Truck', type: 'Truck' },
    { id: 'demo-3', name: 'Demo Bus', type: 'Bus' },
    { id: 'demo-1', name: 'Demo Car', type: 'Sedan' },
    { id: 'demo-2', name: 'Demo Truck', type: 'Truck' },
    { id: 'demo-3', name: 'Demo Bus', type: 'Bus' },
    { id: 'demo-1', name: 'Demo Car', type: 'Sedan' },
    { id: 'demo-2', name: 'Demo Truck', type: 'Truck' },
    { id: 'demo-3', name: 'Demo Bus', type: 'Bus' },
    { id: 'demo-1', name: 'Demo Car', type: 'Sedan' },
    { id: 'demo-2', name: 'Demo Truck', type: 'Truck' },
    { id: 'demo-3', name: 'Demo Bus', type: 'Bus' },
    { id: 'demo-1', name: 'Demo Car', type: 'Sedan' },
    { id: 'demo-2', name: 'Demo Truck', type: 'Truck' },
    { id: 'demo-3', name: 'Demo Bus', type: 'Bus' },
    { id: 'demo-1', name: 'Demo Car', type: 'Sedan' },
    { id: 'demo-2', name: 'Demo Truck', type: 'Truck' },
    { id: 'demo-3', name: 'Demo Bus', type: 'Bus' },
    { id: 'demo-1', name: 'Demo Car', type: 'Sedan' },
    { id: 'demo-2', name: 'Demo Truck', type: 'Truck' },
    { id: 'demo-3', name: 'Demo Bus', type: 'Bus' },
  ]
  return (
    <>
      <div className="app-container">
        <div className="main-content">
          <h1>dashboard</h1>
          <p>Your email is: {user ? user.email : 'Guest'}</p>
          <p>Your role is: {user ? user.role : 'Guest'}</p>
          <button onClick={handleLogout}>Logout</button>

          {/* select company and location */}
          <div style={{ margin: '24px 0' }}>
            <label>
              Company:
              <select onChange={e => setCompanyId(e.target.value)}>
                {companies.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </label>
            <label style={{ marginLeft: 16 }}>
              Location:
              <select onChange={e => setLocationId(e.target.value)}>
                {locations.map(l => (
                  <option key={l.id} value={l.id}>{l.name}</option>
                ))}
              </select>
            </label>
            <button style={{ marginLeft: 16 }} onClick={handleFetchVehicles}>Fetch Vehicles</button>
          </div>

          {/* table show vehicles */}
          <table className="dashboard-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              {vehicles.length === 0 ? (
                <tr>
                  <td colSpan="3" style={{ textAlign: 'center' }}>No vehicles found</td>
                </tr>
              ) : (
                vehicles.map(v => (
                  <tr key={v.id}>
                    <td>{v.id}</td>
                    <td>{v.name}</td>
                    <td>{v.type}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {/* go to top page button */}
          <button className='goto-top-page-button' onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            ^
          </button>

          {/*video component */}
        </div>
      </div>
    </>
  )
}

