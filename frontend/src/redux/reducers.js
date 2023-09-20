import { createSlice } from '@reduxjs/toolkit';

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
        // ... autres actions pour gérer la connexion ?
    },
});

export const { logOut } = authSlice.actions;
export const authReducer = authSlice.reducer;
