import { defineStore } from "pinia";
import { roadmapData, onboardingData } from "../utils/data"
import type { LanguageLocale, UserData } from "../types/home";

const useAppStore = defineStore("appStore", () => {
  const { api } = useApi();
  const { $i18n } = useNuxtApp();
  const userData = ref<UserData>()
  const DashboardData = ref(roadmapData);
  const onboardingViewData = ref(onboardingData);
  const onboardingProgress = ref<string | null>('25%')

  const setOnboardingProgress = (value: string | null) => {
    onboardingProgress.value = value;
  }
  const setLocale = (newLocale: LanguageLocale) => {
    const matchedLocale = ALL_LOCALES.find(locale => locale.value === newLocale);
    
    if (matchedLocale) {
      $i18n.setLocale(matchedLocale.value as "en" | "vi");
    } else {
      $i18n.setLocale("en");
    }
  };

  const getUserData = async () => {
    const response = await api.get("/api/v1/student/basic-info")
    userData.value = response.data.data
  }

  return {
    DashboardData,
    onboardingViewData,
    userData,
    onboardingProgress,
    setOnboardingProgress,
    getUserData,
    setLocale
  }
});

export default useAppStore;