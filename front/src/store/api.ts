import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3000/api/',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export default { api };
