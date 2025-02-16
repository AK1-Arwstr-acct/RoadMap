import { defineStore } from "pinia";
import type { CountriesOptionAttributes, OptionAttributes } from "~/types/home";
import useAppStore from "~/stores/AppStore";
import axios from "axios";


const useOnboardingStore = defineStore("onboardingStore", () => {
    const onboardingProgress = ref<string | null>('20%')

    const setOnboardingProgress = (value: string | null) => {
        onboardingProgress.value = value;
    }

    return {
        onboardingProgress,
        setOnboardingProgress,
    }
});

export default useOnboardingStore;