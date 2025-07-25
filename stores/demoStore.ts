import { defineStore } from "pinia";
import type { CountriesOptionAttributes, FilterKey, OptionAttributes, programOptions } from "~/types/home";
import axios from "axios";
import type { Program, RecommendationSchoolsPagination } from "~/types/program";
import useAppStore from "./AppStore";

const useDemoStore = defineStore("demoStore", () => {

    const { showToast } = useToast();
    const { api } = useApi();
    const appStore = useAppStore();

    const aiRecommendationList = ref<boolean>(false);
    const sortParam = ref<FilterKey | null>(null);
    const isSchoolListPublic = ref<boolean>(!appStore.authenticatedUser);
    const selectedFilter = ref<OptionAttributes | null>(null);
    const isSchoolsLoading = ref<boolean>(false);
    const enginePosition = ref<"pre" | "post" | "final">("pre");
    const programListOptions = ref<OptionAttributes[]>([])
    const locationOptions = ref<CountriesOptionAttributes[]>([])
    const coursePreferenceOptions = ref<OptionAttributes[]>([]);
    const budgetList = ref<OptionAttributes[]>([]);
    const totalSchool = ref<number | null>(null);
    const schoolsList = ref<Program[]>([]);
    const recommendedSchoolsPagination =
        ref<RecommendationSchoolsPagination | null>(null);
    const overViews = ref<string[] | null>([]);
    const isFinalEnginCall = ref<boolean>(false);
    // for public user
    const selectedPublicMajors = ref<number[]>([]);
    //  demo data
    const majorsList = ref<programOptions[]>([]);
    const filterSchoolsList = ref<Program[]>([]);

    const setSortParam = (data: FilterKey | null) => {
        sortParam.value = data;
    }

    return {
        aiRecommendationList,
        isSchoolListPublic,
        selectedFilter,
        isSchoolsLoading,
        programListOptions,
        locationOptions,
        coursePreferenceOptions,
        budgetList,
        schoolsList,
        overViews,
        totalSchool,
        enginePosition,
        recommendedSchoolsPagination,
        sortParam,
        isFinalEnginCall,
        selectedPublicMajors,
        majorsList,
        filterSchoolsList,
        setSortParam,
    }
});

export default useDemoStore;