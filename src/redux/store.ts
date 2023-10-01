import { configureStore, combineReducers, getDefaultMiddleware } from '@reduxjs/toolkit';
import userReducer from './user';

const rootReducer = combineReducers({
   user: userReducer,
});

export type RootState = ReturnType<typeof rootReducer>

const store = configureStore({
   reducer: rootReducer,
   middleware: [
      ...getDefaultMiddleware(),
   ],
});

export default store;

