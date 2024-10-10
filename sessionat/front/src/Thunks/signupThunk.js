
// src/thunks/dataThunks.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie'; // Ensure this import is present

export const fetchData = createAsyncThunk('user/fetchData', async (userData) => {
    const response = await axios.post('http://localhost:5000/api/signup', userData, {

        withCredentials: true,
   });
    

    const { role } = response.data;
    
    Cookies.set('role', role);
   
 

    return response.data;  
});
