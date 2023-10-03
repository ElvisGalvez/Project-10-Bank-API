import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchUserDetails = createAsyncThunk(
  'auth/fetchUserDetails',
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem('token');

    if (!token) {
      return rejectWithValue('Token is not available');
    }

    try {
      const response = await axios.post('http://localhost:3001/api/v1/user/profile', {}, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      const userDetails = response.data.body;
      return userDetails;
    } catch (error) {
      console.error('Error fetching user details:', error);
      return rejectWithValue(error.message || 'Failed to fetch user details');
    }
  }
);


// Ici, les actions utilisées pour dispatcher des actions qui déclenchent des effets secondaires dans les middlewares.
export const initializeApp = () => ({
  type: 'APP_INITIALIZE'
});

export const updateProfileSuccessAction = (user) => ({
  type: 'UPDATE_PROFILE_SUCCESS',
  payload: user
});

export const updateProfileFailureAction = (error) => ({
  type: 'UPDATE_PROFILE_FAILURE',
  payload: error
});

export const logInRequestAction = (email, password) => ({
  type: 'LOGIN_REQUEST',
  payload: { email, password }
});

export const logInSuccessAction = (user) => ({
  type: 'LOGIN_SUCCESS',
  payload: user
});

export const logInFailureAction = (error) => ({
  type: 'LOGIN_FAILURE',
  payload: error
});

export const updateProfileRequestAction = (firstName, lastName) => ({
  type: 'UPDATE_PROFILE_REQUEST',
  payload: { firstName, lastName }
});
