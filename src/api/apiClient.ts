import axios from 'axios';

export const apiClient = axios.create({
  baseURL: 'https://api-bancoXYZ.com',
  headers: {
    'Content-Type': 'application/json',
  },
});
