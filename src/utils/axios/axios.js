import axios from 'axios';
import {getToken, setToken} from '../helpers/async-storage';
import {BACKEND_URL, API_KEY} from '@env';

const refreshAuthToken = async () => {
  const token = await getToken();

  try {
    const res = await axios.post(
      `https://securetoken.googleapis.com/v1/token?key=${API_KEY}`,
      `grant_type=refresh_token&refresh_token=${token.refreshToken}`,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );

    const newIdToken = res.data.id_token;
    const newRefreshToken = res.data.refresh_token;

    await setToken({token: newIdToken, refreshToken: newRefreshToken});
    return newIdToken;
  } catch (err) {
    console.error('Error refreshing token', err);
    return null;
  }
};

const instance = axios.create({
  baseURL: BACKEND_URL,
});

// Request interceptor
instance.interceptors.request.use(
  async config => {
    const token = await getToken();
    if (token) {
      config.url += `?auth=${token.token}`;
    }
    return config;
  },
  error => Promise.reject(error),
);

// Response interceptor
instance.interceptors.response.use(
  res => res,
  async error => {
    const originalRequest = error.config;

    // Handle 401 error (unauthorized), and retry request
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      const newToken = await refreshAuthToken();

      if (newToken) {
        originalRequest.url = originalRequest.url.replace(
          /auth=[^&]+/,
          `auth=${newToken}`,
        );
        return instance(originalRequest);
      }
    }

    return Promise.reject(error);
  },
);

export default instance;
