import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';  
import Footer from './components/Footer';
import NavBar from './components/NavBar';  
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { Provider, useDispatch, useSelector } from 'react-redux';
import store from './redux/store';  
import { initializeApp} from './redux/actions';  
import { logOut } from './redux/reducers';

function AppInitializer({ children }) {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);  

  useEffect(() => {
    dispatch(initializeApp());  // Dispatch l'action d'initialisation une fois au premier rendu
  }, [dispatch]);

  // useEffect pour écouter les changements dans l'historique de navigation
  useEffect(() => {
    const unlisten = window.addEventListener('popstate', () => {
      if (!isAuthenticated) return;  // Pas besoin de déconnecter si déjà déconnecté

      dispatch(logOut());
    });

    // Cleanup
    return () => {
      window.removeEventListener('popstate', unlisten);
    };
  }, [isAuthenticated, dispatch]);

  return children;
}

const root = ReactDOM.createRoot(document.getElementById('root'));

// Le Provider rend le store disponible pour tous les composants de l'application
root.render(
  <React.StrictMode>
    <Provider store={store}> 
      <AppInitializer>
        <Router>
          <NavBar />  
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/sign-out" element={<Navigate to="/" />} />  
            <Route path="/index.html" element={<Navigate to="/" />} /> 
          </Routes>
          <Footer /> 
        </Router>
      </AppInitializer>
    </Provider>
  </React.StrictMode>
);
