import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import './assets/Dashboard.scss'
import { selectCurrentUser } from '../../store/slices/authSlice.js'
import { selectVehicles } from '../../store/slices/vehiclesSlice.js';
import { logout } from '../../store/slices/authSlice.js'
import api from '../../api/api'
import TruckIcon from '../../components/icons/TruckIcon.jsx';

export default function Dashboard() {
  const [viewMode, setViewMode] = useState('table');

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

          <button className="toggle-view-btn">
            <span
              className={viewMode === 'table' ? 'toggle-icon active' : 'toggle-icon'}
              title="Dạng bảng"
              onClick={() => viewMode !== 'table' && setViewMode('table')}
              style={{ cursor: viewMode === 'table' ? 'default' : 'pointer' }}
            >
              <svg width="22" height="22" viewBox="0 0 22 22">
                <rect y="4" width="22" height="2" rx="1" fill={viewMode === 'table' ? "#484848ff" : "#bbb"} />
                <rect y="10" width="22" height="2" rx="1" fill={viewMode === 'table' ? "#484848ff" : "#bbb"} />
                <rect y="16" width="22" height="2" rx="1" fill={viewMode === 'table' ? "#484848ff" : "#bbb"} />
              </svg>
            </span>
            <span
              className={viewMode === 'card' ? 'toggle-icon active' : 'toggle-icon'}
              title="Dạng thẻ"
              onClick={() => viewMode !== 'card' && setViewMode('card')}
              style={{ cursor: viewMode === 'card' ? 'default' : 'pointer' }}
            >
              <svg width="22" height="22" viewBox="0 0 22 22">
                <rect x="2" y="2" width="7" height="7" rx="2" fill={viewMode === 'card' ? "#484848ff" : "#bbb"} />
                <rect x="13" y="2" width="7" height="7" rx="2" fill={viewMode === 'card' ? "#484848ff" : "#bbb"} />
                <rect x="2" y="13" width="7" height="7" rx="2" fill={viewMode === 'card' ? "#484848ff" : "#bbb"} />
                <rect x="13" y="13" width="7" height="7" rx="2" fill={viewMode === 'card' ? "#484848ff" : "#bbb"} />
              </svg>
            </span>
          </button>


          {/* table show vehicles */}

          {/* Hiển thị table hoặc card */}
          {viewMode === 'table' ? (
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
          ) : (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: 16,
                marginTop: 16,
              }}
            >
              {vehicles.length === 0 ? (
                <div style={{ gridColumn: '1/-1', textAlign: 'center' }}>No vehicles found</div>
              ) : (
                vehicles.map(v => (
                  <div
                    key={v.id}
                    style={{
                      border: '1px solid #e0e0e0',
                      borderRadius: 8,
                      padding: 16,
                      background: '#fff',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                    }}
                  >
                    {/* <TruckIcon width={48} height={48} fill="#333" />*/}
                    <TruckIcon /> 
                    
                    <div><strong>ID:</strong> {v.id}</div>
                    <div><strong>Name:</strong> {v.name}</div>
                    <div><strong>Type:</strong> {v.type}</div>
                  </div>
                ))
              )}
            </div>
          )}

        </div>
      </div>
    </>
  )
}

