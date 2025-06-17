import {configureStore} from '@reduxjs/toolkit';
import favReducer from './favMealsSlice';
import expenseReducer from './expenseTrackingSlice';
import authReducer from './authSlice';
import placeFormReducer from './placesSlices';

export const store = configureStore({
  reducer: {
    favMeals: favReducer,
    expTracking: expenseReducer,
    auth: authReducer,
    placeForm: placeFormReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
