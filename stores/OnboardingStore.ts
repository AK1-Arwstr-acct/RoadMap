import { defineStore } from "pinia";

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