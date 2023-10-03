import { createSlice } from '@reduxjs/toolkit';
import { fetchUserDetails } from './actions';  

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: !!localStorage.getItem('token'),
    user: null,
    error: null,
    isEditing: false,
    editingFirstName: '',
    editingLastName: '',
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
    setFirstName: (state, action) => {
      state.editingFirstName = action.payload;
    },
    setLastName: (state, action) => {
      state.editingLastName = action.payload;
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

export const { logOut, logInSuccess, logInFailure, updateProfileSuccess, updateProfileFailure, toggleEditing, setFirstName, setLastName } = authSlice.actions;
export const authReducer = authSlice.reducer;
export { authSlice };
