import { defineStore } from "pinia";
import { roadmapData, onboardingData } from "../utils/data"
import type { UserData } from "../types/home";

const useAppStore = defineStore("appStore", () => {
    const UserData = ref<UserData>({
        id: null,
        name: null,
        user_name: null,
        email: null,
        created_at: null,
        oldUser: null,
    });
    const DashboardData = ref(roadmapData);
    const onboardingViewData = ref(onboardingData);

    const chekCountry = () => {
        const data = sessionStorage.getItem('formData') || null
        if (data) {
            const countries = JSON.parse(data).countries;
            DashboardData.value = roadmapData.filter((item) => {
                return countries.includes(item.country) || item.country === null;
            })
        };
    }

    const setUserData = (data: UserData) => {
        UserData.value = data
    }

    return {
        DashboardData,
        onboardingViewData,
        UserData,
        chekCountry,
        setUserData
    }
});

export default useAppStore;