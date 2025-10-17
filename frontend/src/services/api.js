import axios from 'axios';

// The credentials for Basic Authentication
const username = 'admin';
const password = 'password123';

const api = axios.create({
  baseURL: 'https://homework-16xf.onrender.com',
  auth: {
    username: username,
    password: password,
  },
});

export default api;