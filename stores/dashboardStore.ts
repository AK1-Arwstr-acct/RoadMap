import { defineStore } from "pinia";
import type { CountriesOptionAttributes, FilterKey, OptionAttributes } from "~/types/home";
import axios from "axios";
import type { Program, RecommendationSchoolsPagination } from "~/types/program";
import useAppStore from "./AppStore";

const useDashboardStore = defineStore("dashboardStore", () => {

    const { showToast } = useToast();
    const { api } = useApi();
    const appStore = useAppStore();

    const isSchoolListPublic = ref<boolean>(!appStore.authenticatedUser);
    const selectedFilter = ref<OptionAttributes | null>(null);
    const isSchoolsLoading = ref<boolean>(false);
    const enginePosition = ref<"pre" | "post" | "final">("pre");
    const sortParam = ref<FilterKey | null>(null);
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
    const programTitleParentId = ref<string>('');
    const selectedPublicMajors = ref<number[]>([]);
    const isPublicMajorEnable = ref<boolean>(false);

    const setSortParam = (data: FilterKey | null) => {
        sortParam.value = data;
    }
    const setProgramListOptions = async () => {
        try {
            let response;
            if (isSchoolListPublic.value) {
                const publicToken = useCookie('publicToken');
                response = await api.get(
                    `/api/v2/session-based-journey/school-recommended/class-grades`,
                    {
                        headers: {
                            "X-auth-token": publicToken.value,
                        },
                    }
                );
            } else {
                response = await api.get(
                    `/api/v1/school/recommended/class-grades`
                );
            }
            if (response?.data.data) {
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
                            label: `${budgetWithComma(item[0])}  ${!!item[1] ? " - " + budgetWithComma(item[1]) : ""
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
            isSchoolsLoading.value = true;
            let response;

            if (isSchoolListPublic.value) {
                const publicToken = useCookie('publicToken');
                response = await api.post(
                    `/api/v2/session-based-journey/recommendation/pre-run-engine`,
                    {
                        program_title_parent_id: programTitleParentId.value,
                        ...(sortParam.value)
                    },
                    {
                        params: {
                            page,
                            // ...(sortParam.value)
                        },
                        headers: {
                            "X-auth-token": publicToken.value,
                        },
                    }
                );
                isPublicMajorEnable.value = true;

            } else {
                response = await api.get(
                    `/api/v1/school/recommendation/pre-run-engine`, {
                    params: {
                        page,
                        ...(sortParam.value)
                    }
                });
            }
            if (response) {
                schoolsList.value = response.data.data;
                recommendedSchoolsPagination.value = response.data.pagination;
                totalSchool.value = response.data.total;
                enginePosition.value = "pre";
                overViews.value = [];
                isFinalEnginCall.value = false;
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const errorMessage = errorList(error);
                showToast(errorMessage, {
                    type: "error",
                });
            }
        } finally {
            isSchoolsLoading.value = false;
        }
    };

    const runEngine = async (page: number = 1) => {
        try {
            isSchoolsLoading.value = true;
            let response;
            if (isSchoolListPublic.value) {
                const publicToken = useCookie('publicToken');
                response = await api.post(`/api/v2/session-based-journey/recommendation/run-engine`,
                    {
                        program_title_ids: selectedPublicMajors.value,
                        ...(sortParam.value)
                    },
                    {
                        params: {
                            page,
                            // ...(sortParam.value)
                        },
                        headers: {
                            "X-auth-token": publicToken.value,
                        },
                    }
                );
            } else {
                response = await api.get(`/api/v1/school/recommendation/run-engine`, {
                    params: {
                        page,
                        ...(sortParam.value)
                    }
                });
            }
            if (response) {
                schoolsList.value = response.data.data;
                recommendedSchoolsPagination.value = response.data.pagination;
                totalSchool.value = response.data.total;
                enginePosition.value = "post";
                overViews.value = [];
                isFinalEnginCall.value = false;
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const errorMessage = errorList(error);
                showToast(errorMessage, {
                    type: "error",
                });
            }
        } finally {
            isSchoolsLoading.value = false;
        }
    };

    const runFinalEngine = async (page: number = 1, sort?: { [key: string]: string }) => {
        try {
            isSchoolsLoading.value = true;
            const response = await api.get(
                `/api/v1/school/recommendation/final-engine`, {
                params: {
                    page,
                    ...(sortParam.value)
                }
            }
            );
            if (response) {
                schoolsList.value = response.data.data;
                recommendedSchoolsPagination.value = response.data.pagination;
                totalSchool.value = response.data.total;
                overViews.value = Object.values(response.data.overview);
                enginePosition.value = "final";
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const errorMessage = errorList(error);
                showToast(errorMessage, {
                    type: "error",
                });
            }
        } finally {
            isSchoolsLoading.value = false;
        }
    };

    const removePublicUserData = () => {
        programTitleParentId.value = '';
        selectedPublicMajors.value = [];
        isPublicMajorEnable.value = false;
        const publicToken = useCookie('publicToken');
        publicToken.value = null;
        const publicUserData = useCookie('publicUserData');
        publicUserData.value = null;
    }

    watch(() => appStore.authenticatedUser, () => {
        isSchoolListPublic.value = !appStore.authenticatedUser;
        removePublicUserData();
    })

    return {
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
        programTitleParentId,
        isPublicMajorEnable,
        selectedPublicMajors,
        setSortParam,
        setBudgetList,
        setCoursePreferenceOptions,
        setLocationOptions,
        setProgramListOptions,
        preRunEngine,
        runEngine,
        runFinalEngine,
    }
});

export default useDashboardStore;