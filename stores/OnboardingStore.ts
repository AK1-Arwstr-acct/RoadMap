import { defineStore } from "pinia";
import type { CountriesOptionAttributes, OptionAttributes } from "~/types/home";

const useOnboardingStore = defineStore("onboardingStore", () => {

    const onboardingProgress = ref<string | null>('20%')
    const programListOptions = ref<OptionAttributes[]>([])
    const locationOptions = ref<CountriesOptionAttributes[]>([])
    const coursePreferenceOptions = ref<OptionAttributes[]>();
    const budgetList = ref<OptionAttributes[]>();

    const setProgramListOptions = (value: OptionAttributes[]) => {
        programListOptions.value = value
    }
    const setLocationOptions = (value: CountriesOptionAttributes[]) => {
        locationOptions.value = value
    }
    const setCoursePreferenceOptions = (value: OptionAttributes[]) => {
        coursePreferenceOptions.value = value
    }
    const setBudgetList = (value: OptionAttributes[]) => {
        budgetList.value = value
    }

    const setOnboardingProgress = (value: string) => {
        onboardingProgress.value = value;
    }

    return {
        onboardingProgress,
        programListOptions,
        locationOptions,
        coursePreferenceOptions,
        budgetList,
        setBudgetList,
        setCoursePreferenceOptions,
        setLocationOptions,
        setProgramListOptions,
        setOnboardingProgress,
    }
}, {
    persist: {
        storage: persistedState.localStorage,
        paths: ['programListOptions', 'locationOptions', 'coursePreferenceOptions', 'budgetList']
    } as any,
});

export default useOnboardingStore;