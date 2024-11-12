import { createSlice } from '@reduxjs/toolkit';

const signupSlice = createSlice({
  name: 'signup',
  initialState: {
    full_name: '',
    email: '',
    password: '',
    city: '',
    phone_number: '',
    notification: null, // Add notification state
  },
  reducers: {
    updateField: (state, action) => {
      state[action.payload.field] = action.payload.value;
    },
    clearFields: (state) => {
      state.full_name = '';
      state.email = '';
      state.password = '';
      state.city = '';
      state.phone_number = '';
      state.notification = null; // Clear notification
    },
    setNotification: (state, action) => {
      state.notification = action.payload;
    },
    clearNotification: (state) => {
      state.notification = null;
    },
  },
});

export const { updateField, clearFields, setNotification, clearNotification } = signupSlice.actions;

export default signupSlice.reducer;
