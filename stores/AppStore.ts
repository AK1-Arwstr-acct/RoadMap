import { defineStore } from "pinia";
import { roadmapData, onboardingData } from "../utils/data"
import type { ClassGrades, CurrentClassGrade, UserData, UserLoginData } from "../types/home";

const useAppStore = defineStore("appStore", () => {
    const { api } = useApi();

    const userLoginData = ref<UserLoginData>({
        id: null,
        name: null,
        user_name: null,
        email: null,
        created_at: null,
        oldUser: null,
    });
    const userData = ref<UserData>()
    const DashboardData = ref(roadmapData);
    const onboardingViewData = ref(onboardingData);
    const currentClassGrade = ref<ClassGrades[]>([]);

    const chekCountry = () => {
        const data = sessionStorage.getItem('formData') || null
        if (data) {
            const countries = JSON.parse(data).countries;
            DashboardData.value = roadmapData.filter((item) => {
                return countries.includes(item.country) || item.country === null;
            })
        };
    }

    const setUserLoginData = (data: UserLoginData) => {
        userLoginData.value = data
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
        userLoginData,
        userData,
        currentClassGrade,
        chekCountry,
        setUserLoginData,
        getUserData,
        getClassGrades,
        setCurrentClassGrade
    }
});

export default useAppStore;