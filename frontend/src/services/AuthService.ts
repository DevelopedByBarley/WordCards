
import axios, { InternalAxiosRequestConfig } from 'axios';


/* type UserTypes = {
  name: string,
  email: string,
  password: string
} */

export function authByToken() {
  const accessToken = localStorage.getItem('accessToken');
  if(!accessToken) window.location.href = '/user/login'
}

export async function getUser() {
  const fetch = await fetchAuthentication.get('/api/users/index');
  const fetchData = await fetch.data;
  return fetchData.user
}

export const fetchAuthentication = axios.create();

fetchAuthentication.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      return config;
    }

    return {
      ...config,
      headers: {
        ...config.headers,
        Authorization: `Bearer ${accessToken}`
      }
    } as InternalAxiosRequestConfig<string>;
  },
  (error) => Promise.reject(error)
);


fetchAuthentication.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error(error);

    if (error.response.status !== 403) {
      return Promise.reject(error);
    }

    const originalRequest = error.config;

    if (originalRequest.isRetry) {
      return Promise.reject(error);
    }

    originalRequest.isRetry = true;

    return axios
      .get("/api/get-token", {
        withCredentials: true,
      })
      .then((res) => {
        const accessToken = res.data.accessToken;
        localStorage.removeItem('accessToken');
        if(!accessToken) window.location.href = '/user/login';
        localStorage.setItem('accessToken', accessToken);
      })
      .then(() => fetchAuthentication(originalRequest))
      .catch(err => {
        console.error(err);
        localStorage.clear();
        window.location.href = "/user/login";
      })
  }
);