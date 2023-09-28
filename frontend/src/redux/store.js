import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { authReducer } from './reducers';
import { authMiddleware, profileMiddleware } from './middlewares';

const rootReducer = combineReducers({
    auth: authReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(authMiddleware, profileMiddleware),
});

export default store;