import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { authReducer } from './reducers';
import { authMiddleware } from './middlewares';

const rootReducer = combineReducers({
    auth: authReducer,
    // ... ici les autres reducers
});

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(authMiddleware),
});

export default store;