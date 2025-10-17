// src/services/api.js
import axios from 'axios';

// The credentials for Basic Authentication
const username = 'admin';
const password = 'password123';

const api = axios.create({
  baseURL: 'http://localhost:5001/api',
  auth: {
    username: username,
    password: password,
  },
});

export default api;