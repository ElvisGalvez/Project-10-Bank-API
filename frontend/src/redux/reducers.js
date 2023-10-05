import { createSlice } from '@reduxjs/toolkit';
import { fetchUserDetails } from './actions';  

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: !!localStorage.getItem('token'),
    user: null,
    error: null,
    isEditing: false,
  },
  reducers: {
    logOut: (state) => {
      state.isAuthenticated = false;
      localStorage.removeItem('token');
    },
    logInSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logInFailure: (state, action) => {
      state.error = action.payload;
    },
    toggleEditing: (state) => {
      state.isEditing = !state.isEditing;
    },

    updateProfileSuccess: (state, action) => {
      state.user = action.payload;
    },
    updateProfileFailure: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserDetails.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(fetchUserDetails.rejected, (state, action) => {
        state.error = action.payload;
      });
  }
});

export const { logOut, logInSuccess, logInFailure, updateProfileSuccess, updateProfileFailure, toggleEditing } = authSlice.actions;
export const authReducer = authSlice.reducer;
export { authSlice };
