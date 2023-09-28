import * as actionTypes from './actionsTypes';

export const initializeApp = () => ({
    type: actionTypes.APP_INITIALIZE
  });

export const logInRequestThunk = (email, password) => async (dispatch, getState) => {
  // ici la logique pour LOGIN_REQUEST
  // dispatch pour envoyer des actions
};

export const updateProfileSuccessAction = (user) => ({
  type: actionTypes.UPDATE_PROFILE_SUCCESS,
  payload: user
});

export const updateProfileFailureAction = (error) => ({
  type: actionTypes.UPDATE_PROFILE_FAILURE,
  payload: error
});

export const logInRequestAction = (email, password) => ({
    type: actionTypes.LOGIN_REQUEST,
    payload: { email, password }
  });

export const logInSuccess = (user) => ({
    type: actionTypes.LOGIN_SUCCESS,
    payload: user
  });
  
  export const logInFailure = (error) => ({
    type: actionTypes.LOGIN_FAILURE,
    payload: error
  });

export const updateProfileRequestAction = (firstName, lastName) => ({
  type: actionTypes.UPDATE_PROFILE_REQUEST,
  payload: { firstName, lastName }
});