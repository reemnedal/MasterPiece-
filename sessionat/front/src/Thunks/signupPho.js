// src/Thunks/signupThunk.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchDataPho = createAsyncThunk('photographer/signup', async (photographerData) => {
  const response = await axios.post('http://localhost:5000/api/pho/signup/photographer', photographerData);
  return response.data;
});
