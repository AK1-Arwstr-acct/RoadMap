import { watch } from 'vue';
import useAppStore from '~/stores/AppStore';
import type { UserData } from '~/types/home';

export default defineNuxtPlugin(() => {
  const appStore = useAppStore();

  const identifyUserInHotjar = (userData: UserData) => {
    if (userData && userData.id) {
      const userId = String(userData.id);
      console.log("[Hotjar] Assigning user attributes:", {
        userId,
        email: userData.email || null,
        name: userData.name || null,
      });
      window.hj('identify', userId, {
        email: userData.email || null,
        name: userData.name || null,
      });
    } else {
      console.warn("[Hotjar] User data is missing or invalid:", userData);
    }
  };

  const waitForHotjar = (callback) => {
    if (typeof window.hj === 'function') {
      console.log("[Hotjar] Hotjar is ready.");
      callback();
    } else {
      console.log("[Hotjar] Waiting for Hotjar to load...");
      const interval = setInterval(() => {
        if (typeof window.hj === 'function') {
          console.log("[Hotjar] Hotjar has loaded.");
          clearInterval(interval);
          callback();
        }
      }, 500);
    }
  };

  watch(
    () => appStore.userData,
    (newValue) => {
      console.log("[Hotjar] Detected user data change:", newValue);
      waitForHotjar(() => identifyUserInHotjar(newValue));
    },
    { immediate: true, deep: true }
  );
});