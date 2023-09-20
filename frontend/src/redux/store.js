import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { authReducer } from './reducers';  

// Pour les états innitiaux :
// const initialState = {
//     ...,
// };

const rootReducer = combineReducers({
    auth: authReducer,
    // ... ici les autres reducers
});

const store = configureStore({
  reducer: rootReducer,
  // preloadedState: initialState, pour ajouter un état innitial au store
});

export default store;
