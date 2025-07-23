// src/components/Navbar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';  
import '../components/Navbar.css'; 

export default function Navbar() {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();            // Auth-context logout
    navigate('/');       // Redirect to home
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/" className="nav-brand">Shopeasy</Link>
      </div>
      <div className="nav-right">
        {!isLoggedIn ? (
          <>
            <Link to="/cart" className="nav-button">Cart</Link>
            <Link to="/login" className="nav-button">Login</Link>
            <Link to="/register" className="nav-button">Register</Link>
          </>
        ) : (
          <>
            <Link to="/cart" className="nav-button">Cart</Link>
            <Link to="/profile" className="nav-button">Profile</Link>
            <button className="nav-link nav-btn" onClick={handleLogout}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
}
