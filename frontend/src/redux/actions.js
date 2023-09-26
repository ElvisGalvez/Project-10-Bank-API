//Ici, les actions utilisées pour dispatcher des actions qui déclenchent des effets secondaires dans les middlewares.

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
    payload: { email, password } //charge utile
});

export const logInSuccessAction = (user) => ({
    type: 'LOGIN_SUCCESS',
    payload: user //détails de l'utilisateur
});

export const logInFailureAction = (error) => ({
    type: 'LOGIN_FAILURE',
    payload: error
});

// modifier le profil
export const updateProfileRequestAction = (firstName, lastName) => ({
    type: 'UPDATE_PROFILE_REQUEST',
    payload: { firstName, lastName }
});