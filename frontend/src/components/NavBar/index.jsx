import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../../components/Logos';
import './NavBar.css';

const NavBar = () => {
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Vérifie si l'utilisateur est authentifié (simplifié en vérifiant un token dans le localStorage)
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, [location]);

  const handleSignOut = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  return (
    <nav className="main-nav">
      <Link className="main-nav-logo" to="/">
        <Logo className="main-nav-logo-image" />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div>
        {isAuthenticated ? (
          <>
            <Link className="main-nav-item" to="/profile">
              <i className="fa fa-user-circle user-icon"></i>
              Tony
            </Link>
            <Link className="main-nav-item" to="/login" onClick={handleSignOut}>
              <i className="fa fa-sign-out user-icon"></i>
              Sign Out
            </Link>

          </>
        ) : (
          <Link className="main-nav-item" to="/login">
            <i className="fa fa-user-circle user-icon"></i>
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
