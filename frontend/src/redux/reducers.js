import { createSlice } from '@reduxjs/toolkit';
import { fetchUserDetails, updateUserProfile } from './actions';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: !!localStorage.getItem('token'),
    user: null,
    error: null,
    isEditing: false,
    editingFirstName: "",
    editingLastName: "",
    email: '',
    password: '',
    rememberMe: !!localStorage.getItem('rememberMe'),
  },
  reducers: {
    logOut: (state) => {
      state.isAuthenticated = false;
      state.email = '';  
      state.password = '';  
      localStorage.removeItem('token');
    },
    logInFailure: (state, action) => {
      state.error = action.payload;
    },
    logInSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
    },    
    toggleEditing: (state) => {
      state.isEditing = !state.isEditing;
    },
    updateEmail: (state, action) => {
      state.email = action.payload;
    },
    updatePassword: (state, action) => {
      state.password = action.payload;
    },
    updateEditingFirstName: (state, action) => {
      state.editingFirstName = action.payload;
    },
    updateEditingLastName: (state, action) => {
      state.editingLastName = action.payload;
    },
    updateProfileSuccess: (state, action) => {
      state.user = action.payload;
    },
    updateProfileFailure: (state, action) => {
      state.error = action.payload;
    },
    updateRememberMe: (state, action) => {
      state.rememberMe = action.payload;
      if (!action.payload) {
        localStorage.removeItem('rememberEmail');
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserDetails.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.user = action.payload; 
        state.error = null;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.error = action.payload;
      });
  }
});

export const { 
  logOut, logInFailure, 
  toggleEditing, updateEmail, updatePassword, 
  updateEditingFirstName, updateEditingLastName, 
  updateProfileSuccess, updateProfileFailure, 
  updateRememberMe, logInSuccess  
} = authSlice.actions;

export const authReducer = authSlice.reducer;
export { authSlice };
