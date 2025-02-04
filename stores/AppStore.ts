import { defineStore } from "pinia";
import { roadmapData, onboardingData } from "../utils/data"
import type { ClassGrades, CurrentClassGrade, LanguageLocale, UserData, UserLoginData } from "../types/home";
import type { AuthUser } from "~/types/auth";

const useAppStore = defineStore("appStore", () => {
  const { api } = useApi();
  const { $i18n } = useNuxtApp();

  const locale = ref<string>(`${$i18n.locale.value}`);
  const authUser = ref<AuthUser>();
  const userData = ref<UserData>()
  const DashboardData = ref(roadmapData);
  const onboardingViewData = ref(onboardingData);
  const currentClassGrade = ref<ClassGrades[]>([]);
  const userImagePreview = ref<string>('');
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
  const setUserImagePreview = (data: string) => {
    userImagePreview.value = data
  }
  const chekCountry = () => {
    const data = sessionStorage.getItem('formData') || null
    if (data) {
      const countries = JSON.parse(data).countries;
      DashboardData.value = roadmapData.filter((item) => {
        return countries.includes(item.country) || item.country === null;
      })
    };
  }

  const setAuthUser = (data: AuthUser) => {
    authUser.value = data
  }

  const getUserData = async () => {
    const response = await api.get("/v1/student/basic-info")
    userData.value = response.data.data
  }

  const getClassGrades = async () => {
    try {
      const response = await api.get(`/v1/sign-up/get-class-grades`);
      currentClassGrade.value = response.data.data.map(
        (item: CurrentClassGrade) => {
          return {
            value: item.id,
            label: item.class_name,
          };
        }
      );
    } catch (error) {
      console.error(error);
    }
  };

  const setCurrentClassGrade = (data: ClassGrades[]) => {
    currentClassGrade.value = data;
  }

  return {
    DashboardData,
    onboardingViewData,
    authUser,
    userData,
    currentClassGrade,
    userImagePreview,
    onboardingProgress,
    setOnboardingProgress,
    setUserImagePreview,
    chekCountry,
    setAuthUser,
    getUserData,
    getClassGrades,
    setCurrentClassGrade,
    setLocale
  }
});

export default useAppStore;