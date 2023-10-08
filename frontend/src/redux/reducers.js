import { createSlice } from '@reduxjs/toolkit';
import { fetchUserDetails } from './actions';

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
      console.log('Mise à jour de rememberMe dans Redux:', action.payload);
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

export const { 
  logOut, logInSuccess, logInFailure, 
  updateProfileSuccess, updateProfileFailure, 
  toggleEditing, updateEditingFirstName, updateEditingLastName, 
  updateEmail, updatePassword, updateRememberMe  
} = authSlice.actions;

export const authReducer = authSlice.reducer;
export { authSlice };
