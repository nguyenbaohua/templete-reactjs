import React from 'react';
import { Routes, Route, Link } from "react-router"
import './assets/Sidebar.scss'

export default function Sidebar() {
  return (
    <nav className="sidebar">
      <h2>Sidebar</h2>
      <ul>
        <li><Link to="/">Dashboard</Link></li>
        <li><Link to="/settings">Settings</Link></li>
      </ul>
    </nav>
  );
}