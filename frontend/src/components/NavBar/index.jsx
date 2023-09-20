import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../../redux/reducers';
import Logo from '../../components/Logos';
import './NavBar.css';

const NavBar = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  const handleSignOut = () => {
    dispatch(logOut()); // Utilise l'action Redux pour se déconnecter
    // Est-ce que j'utilise ReactRouter, plutôt ? 
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
