import axios from 'axios';
import { authSlice, updateProfileSuccess, updateProfileFailure } from './reducers';
import { fetchUserDetails } from './actions';

const { logInSuccess, logInFailure } = authSlice.actions;

const handleAppInitialize = (store) => {
  const token = localStorage.getItem('token');
  if (token) {
    store.dispatch(fetchUserDetails());
  }
};

const handleLoginRequest = async (store, action) => {
  const { email, password } = action.payload;
  try {
    const response = await axios.post('http://localhost:3001/api/v1/user/login', {
      email,
      password,
    });
    localStorage.setItem('token', response.data.body.token);
    store.dispatch(logInSuccess(response.data.body));  // Envoie le corps de la réponse pour mettre à jour les détails de l'utilisateur
  } catch (error) {
    store.dispatch(logInFailure(error.response ? error.response.data.message : 'Erreur lors de la connexion'));
  }
};

const handleUpdateProfileRequest = async (store, action) => {
  const { firstName, lastName } = action.payload;
  const token = localStorage.getItem('token');
  try {
    const response = await axios.put('http://localhost:3001/api/v1/user/profile', {
      firstName,
      lastName,
    }, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    store.dispatch(updateProfileSuccess(response.data.body));
  } catch (error) {
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
