import React from 'react';
import './Login.css';

const Login = () => {

  const handleSubmit = async (event) => {
    event.preventDefault();

    const username = event.target.username.value;
    const password = event.target.password.value;

    // Utilise l'API pour se connecter
    const response = await fetch("http://localhost:3001/api/v1/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: username, // Suppose que c'est un email plutôt qu'un nom d'utilisateur
        password
      })
    });

    const data = await response.json();

    if (response.ok) {
      // Stocke le token JWT 
      localStorage.setItem('token', data.token);

      // Redirige vers la page de l'utilisateur
      window.location.href = "/profile";
    } else {
      alert(data.message || "Erreur lors de la connexion");
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
              <label htmlFor="username">Username</label>
              <input type="text" id="username" name="username" />
            </div>
            <div className="input-wrapper">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" name="password" />
            </div>
            <div className="input-remember">
              <input type="checkbox" id="remember-me" />
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
