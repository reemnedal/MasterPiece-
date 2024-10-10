
import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../slices/signupSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default store;
