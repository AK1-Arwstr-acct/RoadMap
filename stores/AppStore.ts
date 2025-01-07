import { defineStore } from "pinia";
import { roadmapData, onboardingData } from "../utils/data"

const useAppStore = defineStore("appStore", () => {
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

    return {
        DashboardData,
        onboardingViewData,
        chekCountry
    }
});

export default useAppStore;