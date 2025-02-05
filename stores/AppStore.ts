import { defineStore } from "pinia";
import { roadmapData, onboardingData } from "../utils/data"
import type { ClassGrades, CurrentClassGrade, LanguageLocale, UserData, UserLoginData } from "../types/home";
import type { AuthUser } from "~/types/auth";

const useAppStore = defineStore("appStore", () => {
  const { api } = useApi();
  const { $i18n } = useNuxtApp();

  const locale = ref<string>(`${$i18n.locale.value}`);
  const authUser = ref<AuthUser>({
    id: null,
    uuid: null,
    name: null,
    user_name: null,
    email: null,
    created_at: null,
    oldUser: null,
    onboarded: null,
  });
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
      locale.value = matchedLocale.value;
    } else {
      $i18n.setLocale("en");
      locale.value = 'en';
    }
  };

  const setAuthUser = (data: AuthUser) => {
    authUser.value = data
  }

  const getUserData = async () => {
    const response = await api.get("/api/v1/student/basic-info")
    userData.value = response.data.data
  }

  return {
    DashboardData,
    onboardingViewData,
    authUser,
    userData,
    onboardingProgress,
    setOnboardingProgress,
    setAuthUser,
    getUserData,
    setLocale
  }
});

export default useAppStore;