import axios from 'axios';

export const useApi = () => {
  const config = useRuntimeConfig();
  const api = axios.create({
    baseURL: config.public.baseURL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const token = useCookie('token')

  api.interceptors.request.use(config => {
    if (token.value) {
      config.headers["Authorization"] = `Bearer ${token.value}`
    }
    return config;
  }, error => {
    return Promise.reject(error);
  });

  api.interceptors.response.use(
    response => response,
    error => {
      if (error.response && error.response.status === 401) {
        navigateTo('/login')
      }
      return Promise.reject(error);
    }
  );

  return { api };
}
