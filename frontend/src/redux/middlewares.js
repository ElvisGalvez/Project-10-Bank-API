import axios from 'axios';
import { authSlice, updateProfileSuccess, updateProfileFailure } from './reducers';
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
  const token = localStorage.getItem('token');
  if (token) {
    store.dispatch(fetchUserDetails());
  }
};

const handleLoginRequest = async (store, action) => {
  const { email, password } = action.payload;
  const [data, error] = await apiRequest('post', 'http://localhost:3001/api/v1/user/login', { email, password });
  
  if (data) {
    localStorage.setItem('token', data.body.token);
    store.dispatch(logInSuccess(data.body));
  } else {
    store.dispatch(logInFailure(error.response ? error.response.data.message : 'Erreur lors de la connexion'));
  }
};

const handleUpdateProfileRequest = async (store, action) => {
  const { firstName, lastName } = action.payload;
  const token = localStorage.getItem('token');
  const [data, error] = await apiRequest('put', 'http://localhost:3001/api/v1/user/profile', { firstName, lastName }, {
    'Authorization': `Bearer ${token}`
  });
  
  if (data) {
    store.dispatch(updateProfileSuccess(data.body));
  } else {
    store.dispatch(updateProfileFailure(error.response.data.message || 'Failed to update profile'));
  }
};

export const authMiddleware = store => next => async action => {
  next(action);

  if (action.type === 'APP_INITIALIZE') {
    handleAppInitialize(store);
  }

  if (action.type === 'auth/logInSuccess') {
    store.dispatch(fetchUserDetails());
  }

  if (action.type === 'LOGIN_REQUEST') {
    handleLoginRequest(store, action);
  }

  if (action.type === 'UPDATE_PROFILE_REQUEST') {
    handleUpdateProfileRequest(store, action);
  }
  if (action.type === 'auth/logOut') {
    localStorage.removeItem('token');
  }
  
};
