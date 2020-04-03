import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://uaog6p1uv4.execute-api.eu-west-3.amazonaws.com/dev/',
  withCredentials: true,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export default { api };
