import { fetchUserDetails } from './reducers';
import * as actionTypes from './actionsTypes';
import { 
    logInSuccess, 
    logInFailure, 
    updateProfileSuccessAction as updateProfileSuccess, 
    updateProfileFailureAction as updateProfileFailure
} from './actions';

// les URL de l'API en constantes
const LOGIN_API_URL = "http://localhost:3001/api/v1/user/login";
const PROFILE_API_URL = "http://localhost:3001/api/v1/user/profile";

// Middleware pour l'authentification
export const authMiddleware = store => next => async action => {
  next(action);

  if (action.type === actionTypes.APP_INITIALIZE) {
    const token = localStorage.getItem('token');
    if (token) {
      store.dispatch(fetchUserDetails());
    }
  }

  if (action.type === actionTypes.LOGIN_SUCCESS) {
    store.dispatch(fetchUserDetails());
  }

  if (action.type === actionTypes.LOGIN_REQUEST) {
    const { email, password } = action.payload;

    const response = await fetch(LOGIN_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem('token', data.body.token);
      store.dispatch(logInSuccess());
    } else {
      store.dispatch(logInFailure(data.message || "Erreur lors de la connexion"));
    }
  }
};

// Middleware pour la gestion du profil
export const profileMiddleware = store => next => async action => {
  next(action);

  if (action.type === actionTypes.UPDATE_PROFILE_REQUEST) {
    const { firstName, lastName } = action.payload;
    const token = localStorage.getItem('token');

    const response = await fetch(PROFILE_API_URL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ firstName, lastName })
    });

    const data = await response.json();

    if (response.ok) {
      store.dispatch(updateProfileSuccess(data.body));
    } else {
      store.dispatch(updateProfileFailure(data.message || "Failed to update profile"));
    }
  }
};

