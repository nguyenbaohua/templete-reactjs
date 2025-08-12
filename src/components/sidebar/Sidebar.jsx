import React from 'react';
import { Routes, Route, Link } from "react-router"
import { useSelector } from 'react-redux'
import './assets/Sidebar.scss'
import { selectCurrentUser } from '../../store/slices/authSlice.js'

export default function Sidebar() {
  const currentUser = useSelector(selectCurrentUser)
  const currentUserRole = currentUser?.role
  console.log("currentUserRole:", currentUserRole)

  return (
    <div className="sidebar">
      <ul>
        <li><Link to="/dashboard">Dashboard</Link></li>
        {currentUserRole === 'admin' && (
          <>
            <li><Link to="/settings">Settings</Link></li>
          </>
        )}
      </ul>
    </div>
  );
}