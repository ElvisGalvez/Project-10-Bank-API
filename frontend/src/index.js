import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';  
import Footer from './components/Footer';
import NavBar from './components/NavBar';  
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
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
  </React.StrictMode>
);
