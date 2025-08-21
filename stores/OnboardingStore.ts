import { defineStore } from "pinia";
import type { CountriesOptionAttributes, OptionAttributes } from "~/types/home";
import useAppStore from "~/stores/AppStore";
import axios from "axios";


const useOnboardingStore = defineStore("onboardingStore", () => {
    const onboardingStep = ref<number>(1);

    return {
        onboardingStep,
    }
});

export default useOnboardingStore;