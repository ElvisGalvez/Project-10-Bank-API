// middlewares.js

import axios from 'axios';
import { authSlice } from './reducers';
import { fetchUserDetails } from './actions';

const { logInSuccess, logInFailure } = authSlice.actions;

export const apiRequest = async (method, url, payload, headers = {}) => {
  try {
    const response = await axios({
      method,
      url,
      data: payload,
      headers
    });
    return [response.data, null];
  } catch (error) {
    return [null, error];
  }
};

const handleAppInitialize = (store) => {
  // Récupération et dispatch des valeurs depuis le localStorage lors de l'initialisation
  const token = localStorage.getItem('token');
  if (token) {
    store.dispatch(fetchUserDetails());
  }

  const rememberMe = localStorage.getItem('rememberMe');
  if (rememberMe) {
    store.dispatch({ type: 'auth/updateRememberMe', payload: JSON.parse(rememberMe) });
  }

  if (JSON.parse(rememberMe)) {
    const email = localStorage.getItem('rememberEmail');
    const password = localStorage.getItem('rememberPassword');
    if (email && password) {
      store.dispatch({ type: 'auth/updateEmail', payload: email });
      store.dispatch({ type: 'auth/updatePassword', payload: password });
    }
  }
};

const handleLoginRequest = async (store, action) => {
  const { email, password } = action.payload;
  const [data, error] = await apiRequest('post', 'http://localhost:3001/api/v1/user/login', { email, password });
  
  if (data) {
    localStorage.setItem('token', data.body.token);
    store.dispatch(logInSuccess(data.body));

    const rememberMe = store.getState().auth.rememberMe;
    if (rememberMe) {
      localStorage.setItem('rememberEmail', email);
      localStorage.setItem('rememberPassword', password);
    } else {
      localStorage.removeItem('rememberEmail');
      localStorage.removeItem('rememberPassword');
    }
  } else {
    store.dispatch(logInFailure(error.response ? error.response.data.message : 'Erreur lors de la connexion'));
  }
};

export const authMiddleware = store => next => async action => {
  next(action);

  if (action.type === 'APP_INITIALIZE') {
    handleAppInitialize(store);
  }

  if (action.type === 'LOGOUT') {
    const rememberMe = store.getState().auth.rememberMe;
    if (!rememberMe) {
      localStorage.removeItem('rememberEmail');
      localStorage.removeItem('rememberPassword');
    }
    store.dispatch({ type: 'auth/updateEmail', payload: rememberMe ? localStorage.getItem('rememberEmail') : '' });
    store.dispatch({ type: 'auth/updatePassword', payload: rememberMe ? localStorage.getItem('rememberPassword') : '' });
  }

  if (action.type === 'auth/logInSuccess') {
    store.dispatch(fetchUserDetails());
  }

  if (action.type === 'LOGIN_REQUEST') {
    handleLoginRequest(store, action);
  }

  if (action.type === 'auth/updateRememberMe') {
    localStorage.setItem('rememberMe', JSON.stringify(action.payload));
    if (!action.payload) {
      localStorage.removeItem('rememberEmail');
      localStorage.removeItem('rememberPassword');
    }
  }
};
