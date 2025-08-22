import axios from 'axios';
import useAppStore from '~/stores/AppStore';
import useMajorStore from '~/stores/majorStore';

export const useApi = () => {
  const config = useRuntimeConfig();
  const appStore = useAppStore();
  const majorStore = useMajorStore();
  const localePath = useLocalePath();

  const api = axios.create({
    baseURL: config.public.baseURL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  api.interceptors.request.use(config => {
    const token = useCookie('token');
    if (token.value) {
      config.headers["Authorization"] = `Bearer ${token.value}`;
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
        const checkToken = useCookie("token");
        if (checkToken.value) {
          checkToken.value = null;
        }
        appStore.checkAuthenticatedUser();
        appStore.userData = undefined;
        majorStore.clearStoreData();
        navigateTo(localePath("/login"));
      }
      return Promise.reject(error);
    }
  );

  return { api };
};
