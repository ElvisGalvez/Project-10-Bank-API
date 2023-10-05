import React, { useEffect, useState } from 'react'; 
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logInRequestAction as logInRequest } from '../../redux/actions';
import { logOut } from '../../redux/reducers';
import './Login.css';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Ajout des états pour gérer les valeurs d'email et de mot de passe
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    // Récupération des données stockées si la case "Remember Me" avait été cochée
    const storedEmail = localStorage.getItem('rememberEmail');
    const storedPassword = localStorage.getItem('rememberPassword');

    if (storedEmail && storedPassword) {
      setEmail(storedEmail);
      setPassword(storedPassword);
      setRememberMe(true);
    }

    // Effet pour supprimer le token et déclencher une action de déconnexion
    localStorage.removeItem('token');
    dispatch(logOut());

  }, [dispatch]);

  const handleSubmit = (event) => {
    event.preventDefault();
  
  
    if (email.trim() === '' || password.trim() === '') {
      console.error("L'email ou le mot de passe ne peut pas être vide");
      return;
    }
  
    dispatch(logInRequest(email, password))
      .then(() => {
        if (rememberMe) {
          localStorage.setItem('rememberEmail', email);
          localStorage.setItem('rememberPassword', password);
        } else {
          localStorage.removeItem('rememberEmail');
          localStorage.removeItem('rememberPassword');
        }
        navigate("/profile");
      })
      .catch(error => {
        console.error("Erreur lors de la connexion:", error);
      });
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
              <input type="text" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="input-wrapper">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="input-remember">
              <input type="checkbox" id="remember-me" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />
              <label htmlFor="remember-me">Remember me</label>
            </div>
            <button type="submit" className="sign-in-button">Sign In</button>
          </form>
        </section>
      </main>
    </>
  );
};

export default Login;
