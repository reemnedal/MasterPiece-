// src/slices/signupSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { fetchDataPho } from '../Thunks/signupPho';

const photographerSlice = createSlice({
  name: 'photographer',
  initialState: {
    full_name: '',
    email: '',
    password: '',
    city: '',
    phone_number: '',
    portfolio_link: '',
    years_of_experience: '',
    camera_and_equipment: '',
    description: '',
    notification: null,
    status: 'idle', // To track the async status
    error: null,    // To store any errors
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
      state.portfolio_link = '';
      state.years_of_experience = '';
      state.camera_and_equipment = '';
      state.description = '';
      state.notification = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDataPho.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchDataPho.fulfilled, (state) => {
        state.status = 'succeeded';
        state.notification = 'Signup successful!';
      })
      .addCase(fetchDataPho.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        state.notification = 'Signup failed. Please try again.';
      });
  },
});

export const { updateField, clearFields } = photographerSlice.actions;
export default photographerSlice.reducer;
