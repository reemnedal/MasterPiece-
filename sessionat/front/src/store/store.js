
import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../slices/signupSlice';
import photographerReducer from '../slices/phoSignup';



const store = configureStore({
  reducer: {
    user: userReducer,
    photographer: photographerReducer,
  },
});

export default store;
