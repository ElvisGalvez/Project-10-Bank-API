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
import { Provider, useDispatch } from 'react-redux';
import store from './redux/store';  
import { initializeApp } from './redux/actions';

function AppInitializer({ children }) {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(initializeApp());  // Dispatch the initialize action once on first render
    }, [dispatch]);

    return children;
}

const root = ReactDOM.createRoot(document.getElementById('root'));

//le Provider rends le store disponible pour tous les composants de l'application
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
