import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiRequest } from './middlewares';  

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


// Ici, les actions utilisées pour dispatcher des actions qui déclenchent des effets secondaires dans les middlewares.
export const initializeApp = () => ({
  type: 'APP_INITIALIZE'
});

export const logInRequestAction = (email, password) => ({
  type: 'LOGIN_REQUEST',
  payload: { email, password }
});

export const updateProfileRequestAction = (firstName, lastName) => ({
  type: 'UPDATE_PROFILE_REQUEST',
  payload: { firstName, lastName }
});

