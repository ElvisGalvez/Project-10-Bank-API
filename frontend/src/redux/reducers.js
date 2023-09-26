import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Une action asynchrone pour chercher les détails de l'utilisateur
export const fetchUserDetails = createAsyncThunk(
  'auth/fetchUserDetails',
  async (_, { dispatch, rejectWithValue }) => {
    const token = localStorage.getItem('token'); // Récupération du token

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

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: !!localStorage.getItem('token'),
    user: null,
    error: null,
  },
  reducers: {
    logOut: (state) => {
      state.isAuthenticated = false;
      localStorage.removeItem('token');
    },
    logInSuccess: (state, action) => {
      console.log("Login success");
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logInFailure: (state, action) => {
      console.log("Login failure with error:", action.payload);
      state.error = action.payload;
    },
    updateProfileSuccess: (state, action) => {
      console.log("Profile update success:", action.payload);
      state.user = action.payload;
    },
    updateProfileFailure: (state, action) => {
      console.log("Profile update failure with error:", action.payload);
      state.error = action.payload;
    },

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserDetails.fulfilled, (state, action) => {
        console.log("User details fetched:", action.payload);
        state.user = action.payload;
      })
      .addCase(fetchUserDetails.rejected, (state, action) => {
        console.log("Failed to fetch user details:", action.payload);
        state.error = action.payload;
      });
  }
});

export const { logOut, logInSuccess, logInFailure, updateProfileSuccess, updateProfileFailure } = authSlice.actions;
export const authReducer = authSlice.reducer;
export { authSlice };
