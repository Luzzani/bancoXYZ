import axios from 'axios';

let storeRef: any;

export const injectStore = (_store: any) => {
  storeRef = _store;
};

export const apiClient = axios.create({
  baseURL: 'https://api-bancoXYZ.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  config => {
    const token = storeRef?.getState()?.auth?.token;

    if (token && typeof token === 'string' && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  },
);
