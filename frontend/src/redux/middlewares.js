import { fetchUserDetails, authSlice, updateProfileSuccess, updateProfileFailure } from './reducers';

const { logInSuccess, logInFailure } = authSlice.actions;

export const authMiddleware = store => next => async action => {
    next(action);

    if (action.type === 'APP_INITIALIZE') {
        const token = localStorage.getItem('token');
        if (token) {
            store.dispatch(fetchUserDetails());  // Fetch user details si le token existe
        }
    }

    if (action.type === 'auth/logInSuccess') {
        store.dispatch(fetchUserDetails());  // Dispatche la thunk après une connexion réussie
    }

    if (action.type === 'LOGIN_REQUEST') {
        console.log("Logging in with email:", action.payload.email);
        const { email, password } = action.payload;

        const response = await fetch("http://localhost:3001/api/v1/user/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();
        console.log("API Response Data:", data);

        if (response.ok) {
            console.log("Login successful with token:", data.body.token);
            localStorage.setItem('token', data.body.token);
            store.dispatch(logInSuccess());  // Dispatche logInSuccess après avoir stocké le token
        } else {
            console.log("Login failed with message:", data.message);
            store.dispatch(logInFailure(data.message || "Erreur lors de la connexion"));
        }
    }

    if (action.type === 'UPDATE_PROFILE_REQUEST') {
        console.log("Updating profile with:", action.payload);
        const { firstName, lastName } = action.payload;
        const token = localStorage.getItem('token');

        const response = await fetch("http://localhost:3001/api/v1/user/profile", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ firstName, lastName })
        });

        const data = await response.json();
        console.log("API Update Profile Response:", data);

        if (response.ok) {
            console.log("Profile updated successfully:", data.body.user);
            store.dispatch(updateProfileSuccess(data.body));
        } else {
            console.log("Profile update failed with message:", data.message);
            store.dispatch(updateProfileFailure(data.message || "Failed to update profile"));
        }

    }

};

