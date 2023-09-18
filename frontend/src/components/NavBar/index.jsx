import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../../components/Logos';
import './NavBar.css';

const NavBar = () => {
  const location = useLocation();
  const isUserPage = location.pathname === "/user.html";

  return (
    <nav className="main-nav">
      <Link className="main-nav-logo" to="/"> 
        <Logo className="main-nav-logo-image" />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div>
        { isUserPage ? (
          <>
            <Link className="main-nav-item" to="/user"> 
              <i className="fa fa-user-circle"></i>
              Tony
            </Link>
            <Link className="main-nav-item" to="/sign-out"> 
              <i className="fa fa-sign-out"></i>
              Sign Out
            </Link>
          </>
        ) : (
          <Link className="main-nav-item" to="/sign-in"> 
            <i className="fa fa-user-circle"></i>
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
