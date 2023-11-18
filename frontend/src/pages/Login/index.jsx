import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logInRequestAction as logInRequest } from '../../redux/actions';
import { updateEmail, updatePassword, updateRememberMe } from '../../redux/reducers';

import './Login.css';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const error = useSelector(state => state.auth.error);

  const email = useSelector(state => state.auth.email);
  const password = useSelector(state => state.auth.password);
  const rememberMe = useSelector(state => state.auth.rememberMe);

  useEffect(() => {
    if (rememberMe) {
      const storedEmail = localStorage.getItem('rememberEmail');
      if (storedEmail) {
        dispatch(updateEmail(storedEmail));
      }
    }
  }, [rememberMe, dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/profile");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (email.trim() === '' || password.trim() === '') {
      return;
    }

    try {
      await dispatch(logInRequest(email, password));
      if (isAuthenticated) {
        navigate("/profile");
      }
    } catch (err) {
      console.error("Erreur lors de la connexion:", err);
    }
  };
  
  
  
  

  return (
    <>
      <main className="main bg-dark">
        <section className="sign-in-content">
          <i className="fa fa-user-circle sign-in-icon"></i>
          <h1>Sign In</h1>
          <form onSubmit={handleSubmit}>
            <div className="input-wrapper">
              <label htmlFor="email">Email</label>
              <input type="text" id="email" name="email" value={email} onChange={(e) => dispatch(updateEmail(e.target.value))} />
            </div>
            <div className="input-wrapper">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" name="password" value={password} onChange={(e) => dispatch(updatePassword(e.target.value))} />
            </div>
            <div className="input-remember">
              <input 
                type="checkbox" 
                id="remember-me" 
                checked={rememberMe} 
                onChange={(e) => dispatch(updateRememberMe(e.target.checked))}
              />
              <label htmlFor="remember-me">Remember me</label>
            </div>
            
            <button type="submit" className="sign-in-button">Sign In</button>
          </form>
          {error && <div className="error-message">{error}</div>}
        </section>
      </main>
    </>
  );
};

export default Login;
