import axios from 'axios';
import { AsyncStorage } from 'react-native';

const api = axios.create({
  baseURL: 'http://192.168.0.8:3333',
  // baseURL: 'http://10.0.2.2:3333',
  // baseURL: 'http://192.168.43.60:3333',
});

api.interceptors.request.use(async config => {
  try {
    const token = await AsyncStorage.getItem('@token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  } catch (err) {
    // eslint-disable-next-line no-alert
    alert(err);
  }

  return null;
});

export default api;
