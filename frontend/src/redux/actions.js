import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiRequest } from './middlewares';  
import axios from 'axios';
import { logInFailure, logInSuccess } from './reducers';

export const fetchUserDetails = createAsyncThunk(
  'auth/fetchUserDetails',
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem('token');

    if (!token) {
      return rejectWithValue('Token is not available');
    }

    const [data, error] = await apiRequest('post', 'http://localhost:3001/api/v1/user/profile', {}, {
      'Authorization': `Bearer ${token}`
    });

    if (data) {
      return data.body;
    } else {
      return rejectWithValue(error.message || 'Failed to fetch user details');
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  'auth/updateUserProfile',
  async (userData, { rejectWithValue }) => {  
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        return rejectWithValue('Token not available');
      }

      const response = await apiRequest('put', 'http://localhost:3001/api/v1/user/profile', userData, {
        'Authorization': `Bearer ${token}`
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const initializeApp = () => ({
  type: 'APP_INITIALIZE'
});

export const logInRequestAction = (email, password) => async (dispatch, getState) => {
  try {
    const response = await axios.post('http://localhost:3001/api/v1/user/login', { email, password });
    if (response.status === 200 && response.data.body.token) {
      localStorage.setItem('token', response.data.body.token);
      dispatch(logInSuccess(response.data.body));

      if (getState().auth.rememberMe) {
        localStorage.setItem('rememberEmail', email);
      }
    } else {
      dispatch(logInFailure('Invalid login credentials'));
    }
  } catch (error) {
    dispatch(logInFailure(error.response ? error.response.data.message : 'Login failed'));
  }
};

export const updateProfileRequestAction = (firstName, lastName) => ({
  type: 'UPDATE_PROFILE_REQUEST',
  payload: { firstName, lastName }
});

