import axios from 'axios';

export const useApi = () => {
  const config = useRuntimeConfig();
  const api = axios.create({
    baseURL: config.public.baseURL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  api.interceptors.request.use(config => {
    const token = useCookie('token');

    const runtimeConfig = useRuntimeConfig();
    const cookies = document.cookie.split(";").map((cookie) => cookie.trim());
    const hotjarUserCookie = cookies.find((cookie) => cookie.startsWith(`_hjSessionUser_${runtimeConfig.public.hotjarId}=`));

    if (token.value) {
      config.headers["Authorization"] = `Bearer ${token.value}`;
    }

    if (hotjarUserCookie) {
      const sessionId = hotjarUserCookie.split('=')[1];
      config.headers["hotjarId"] = sessionId;
    }

    return config;
  }, error => {
    return Promise.reject(error);
  });

  api.interceptors.response.use(
    response => response,
    error => {
      if (error.response && error.response.status === 401) {
        useCookie('token').value = null;
        navigateTo('/login');
      }
      return Promise.reject(error);
    }
  );

  return { api };
};
