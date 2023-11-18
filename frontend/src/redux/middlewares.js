import axios from 'axios';
import { fetchUserDetails } from './actions';

import { logInSuccess, logInFailure, updateEmail, updateRememberMe, } from '../redux/reducers';


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
  const token = localStorage.getItem('token');
  if (token) {
    store.dispatch(fetchUserDetails());
  }

  const rememberMe = localStorage.getItem('rememberMe') === 'true';
  store.dispatch(updateRememberMe(rememberMe));
  if (rememberMe) {
    const email = localStorage.getItem('rememberEmail');
    if (email) {
      store.dispatch(updateEmail(email));
    }
  }
};

const handleLoginRequest = async (store, action) => {
  const { email, password } = action.payload;
  try {
    const response = await axios.post('http://localhost:3001/api/v1/user/login', { email, password });
    if (response.data && response.data.token) {
      localStorage.setItem('token', response.data.token);
      store.dispatch(logInSuccess(response.data));

      const rememberMe = store.getState().auth.rememberMe;
      if (rememberMe) {
        localStorage.setItem('rememberEmail', email);
      }
    } else {
      store.dispatch(logInFailure('Invalid login credentials'));
    }
  } catch (error) {
    store.dispatch(logInFailure(error.response ? error.response.data.message : 'Login failed'));
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
    }
    store.dispatch({ type: 'auth/updateEmail', payload: rememberMe ? localStorage.getItem('rememberEmail') : '' });
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
    }
  }
};
