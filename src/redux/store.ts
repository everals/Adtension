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

export const getIncome = (state: RootState) => {
   let sum = 0;
   let count = 0;
   state.user.banners.forEach((ban) => {
      if ('price' in ban) {
         sum += ban.price;
         count++;
      }
   }, 0);

   return +(sum / count).toFixed(2);
};

export default store;

