import { defineStore } from "pinia";
import type { CountriesOptionAttributes, OptionAttributes } from "~/types/home";
import axios from "axios";
import type { Program, RecommendationSchoolsPagination } from "~/types/program";


const useDashboardStore = defineStore("dashboardStore", () => {

    const { showToast } = useToast();
    const { api } = useApi();

    const isMajorsChange = ref<boolean>(true);
    const programListOptions = ref<OptionAttributes[]>([])
    const locationOptions = ref<CountriesOptionAttributes[]>([])
    const coursePreferenceOptions = ref<OptionAttributes[]>();
    const budgetList = ref<OptionAttributes[]>();
    const totalSchool = ref<Number | null>(null);
    const schoolsList = ref<Program[]>([]);
    const recommendedSchoolsPagination =
        ref<RecommendationSchoolsPagination | null>(null);

    const setProgramListOptions = async () => {
        try {
            const response = await api.get(
                `/api/v1/school/recommended/class-grades`
            );
            if (response.data.data) {
                programListOptions.value = response.data.data.map(
                    (item: { id: number; class_name: string }) => {
                        return {
                            value: item.id,
                            label: item.class_name
                        };
                    }
                );
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const errorMessage = errorList(error);
                showToast(errorMessage, {
                    type: "error",
                });
            }
        }
    }

    const setLocationOptions = async () => {
        try {
            const response = await api.get(`/api/v1/school/recommended/countries`);
            if (response.data.data) {
                locationOptions.value = response.data.data?.map(
                    (item: { country_ids: number[]; title: string }) => {
                        return {
                            value: item.country_ids,
                            label: item.title
                        };
                    }
                );
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const errorMessage = errorList(error);
                showToast(errorMessage, {
                    type: "error",
                });
            }
        }
    }

    const setCoursePreferenceOptions = async () => {
        try {
            const response = await api.get(
                "/api/v1/school/recommended/get-super-meta-categories"
            );
            if (response.data.data) {
                coursePreferenceOptions.value = response.data.data.map(
                    (item: { id: number; title: string }) => {
                        return {
                            value: item?.id,
                            label: item?.title,
                        };
                    }
                );
            }
            return [];
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const errorMessage = errorList(error);
                showToast(errorMessage, {
                    type: "error",
                });
            }
        }
    }
    const setBudgetList = async () => {
        try {
            const response = await api.get(`/api/v1/school/recommended/budget-range`);
            if (response.data.data) {
                budgetList.value = response.data.data.map(
                    (item: [string | number, string | number]) => {
                        const min =
                            typeof item[0] === "string"
                                ? Number(item[0].replace(/\+/g, ""))
                                : item[0];
                        const max =
                            typeof item[1] === "string"
                                ? Number(item[1].replace(/\+/g, ""))
                                : item[1];
                        return {
                            value: `${item[0]}-${!!item[1] ? item[1] : ""}`,
                            label: `${budgetWithComma(item[0])}  ${!!item[1] ? " -" + budgetWithComma(item[1]) : ""
                                }`,
                            min: min,
                            max: max,
                        };
                    }
                );
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const errorMessage = errorList(error);
                showToast(errorMessage, {
                    type: "error",
                });
            }
        }
    }

    const preRunEngine = async (page: number = 1) => {
        try {
            const response = await api.get(
                `/api/v1/school/recommendation/pre-run-engine?page=${page > 1 ? `?page=${page}` : ''}`
            );
            if (response) {
                schoolsList.value = response.data.data;
                recommendedSchoolsPagination.value = response.data.pagination;
                totalSchool.value = response.data.total;
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const errorMessage = errorList(error);
                showToast(errorMessage, {
                    type: "error",
                });
            }
        }
    };

    const runEngine = async (page: number = 1) => {
        try {
            const response = await api.get(
                `/api/v1/school/recommendation/run-engine${page > 1 ? `?page=${page}` : ''}`
            );
            if (response) {
                schoolsList.value = response.data.data;
                recommendedSchoolsPagination.value = response.data.pagination;
                totalSchool.value = response.data.total;
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const errorMessage = errorList(error);
                showToast(errorMessage, {
                    type: "error",
                });
            }
        }
    };

    return {
        programListOptions,
        locationOptions,
        coursePreferenceOptions,
        budgetList,
        schoolsList,
        totalSchool,
        isMajorsChange,
        recommendedSchoolsPagination,
        setBudgetList,
        setCoursePreferenceOptions,
        setLocationOptions,
        setProgramListOptions,
        preRunEngine,
        runEngine,
    }
});

export default useDashboardStore;