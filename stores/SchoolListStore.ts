import { defineStore } from "pinia";
import type { CountriesOptionAttributes, FilterKey, OptionAttributes, programOptions } from "~/types/home";
import axios from "axios";
import type { ChecklistPagination, checklistProgram, checklistResponse, Program, RecommendationSchoolsPagination } from "~/types/program";
import useAppStore from "./AppStore";

const useSchoolListStore = defineStore("schoolListStore", () => {

    const { showToast } = useToast();
    const { api } = useApi();
    const appStore = useAppStore();

    const isSchoolListPublic = ref<boolean>(!appStore.authenticatedUser);
    const selectedFilter = ref<OptionAttributes | null>(null);
    const isSchoolsLoading = ref<boolean>(true);
    const enginePosition = ref<"pre" | "post" | "final">("pre");
    const sortParam = ref<FilterKey | null>(null);
    const programListOptions = ref<OptionAttributes[]>([])
    const locationOptions = ref<CountriesOptionAttributes[]>([])
    const coursePreferenceOptions = ref<OptionAttributes[]>([]);
    const budgetList = ref<OptionAttributes[]>([]);
    const totalSchool = ref<number | null>(null);
    const userSelectedSchoolsList = ref<checklistProgram[]>([]); //for checklist
    const userSelectedSchoolsListPublic = ref<Program[]>([]); //for public checklist
    const schoolsList = ref<Program[]>([]);
    const recommendedSchoolsPagination =
        ref<RecommendationSchoolsPagination | null>(null);
    const checklistPagination =
        ref<ChecklistPagination | null>(null);
    const overViews = ref<string[] | null>([]);
    const isFinalEnginCall = ref<boolean>(false);
    // for public user
    const programTitleParentId = ref<string>('');
    const selectedPublicMajors = ref<number[]>([]);
    const isPublicMajorEnable = ref<boolean>(false);
    //  demo data
    const majorsList = ref<programOptions[]>([]);
    const filterSchoolsList = ref<Program[]>([]);
    // school modal state
    const isSchoolDetailModal = ref<boolean>(false);

    const allChipsFilled = ref<boolean>(false);

    // public token for api calls
    // const publicToken = useCookie("publicToken");

    const setSortParam = (data: FilterKey | null) => {
        sortParam.value = data;
    }
    const setProgramListOptions = async () => {
        try {
            const publicToken = useCookie("publicToken");
            let response = await api.get(
                `/api/v2/session-based-journey/school-recommended/class-grades`,
                {
                    headers: {
                        "X-auth-token": publicToken.value,
                    },
                }
            );
            if (response?.data.data) {
                programListOptions.value = response.data.data.map(
                    (item: { id: number; class_name: string }) => {
                        return {
                            value: item.id,
                            label: item.class_name
                        };
                    }
                );
                return programListOptions.value;
            }
            return []
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const errorMessage = errorList(error);
                showToast(errorMessage, {
                    type: "error",
                });
            }
        }
    }

    const setLocationOptions = async (payload: { cgpa: string, class_grade_ids: number[] }) => {
        try {
            const publicToken = useCookie("publicToken");
            const response = await api.post(
                "/api/v2/session-based-journey/school-recommended/countries",
                payload,
                {
                    headers: {
                        "X-auth-token": publicToken.value,
                    },
                }
            );
            if (response.data.data) {
                locationOptions.value = response.data.data?.map(
                    (item: { country_ids: number[]; title: string }) => {
                        return {
                            value: item.country_ids,
                            label: item.title
                        };
                    }
                );
                return locationOptions.value;
            }
            return []
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const errorMessage = errorList(error);
                showToast(errorMessage, {
                    type: "error",
                });
            }
        }
    }

    const setBudgetList = async (payload: { country_ids: number[] }) => {
        try {
            const publicToken = useCookie("publicToken");
            const response = await api.post(
                "/api/v2/session-based-journey/school-recommended/budget-range",
                payload,
                {
                    headers: {
                        "X-auth-token": publicToken.value,
                    },
                }
            );
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
                return budgetList.value;
            }
            return []
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const errorMessage = errorList(error);
                showToast(errorMessage, {
                    type: "error",
                });
            }
        }
    }

    const setCoursePreferenceOptions = async (payload: { min_budget: number | null, max_budget: number | undefined }) => {
        try {
            const publicToken = useCookie("publicToken");
            const response = await api.post(
                "/api/v2/session-based-journey/school-recommended/get-super-meta-categories",
                payload,
                {
                    headers: {
                        "X-auth-token": publicToken.value,
                    },
                }
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
                return coursePreferenceOptions.value;
            }
            return []
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
            overViews.value = [];
            isSchoolsLoading.value = true;
            const publicToken = useCookie('publicToken');
            let response = await api.post(
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
            overViews.value = [];
            isSchoolsLoading.value = true;
            const publicToken = useCookie('publicToken');
            let response = await api.post(`/api/v2/session-based-journey/recommendation/run-engine`,
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
            overViews.value = [];
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

    const getChecklistProgram = async (pageNo: number = 1) => {
        try {
            if (!appStore.authenticatedUser) {
                return;
            }
            isSchoolsLoading.value = true;
            userSelectedSchoolsList.value = [];
            const response = await api.get(`/api/v1/bookmark/program?page=${pageNo}`)
            if (response.data.data) {
                response.data.data.map((item: checklistResponse) => {
                    let program = {
                        ...item.program,
                        school: {
                            ...item.school
                        }
                    }
                    let finalProgram = {
                        id: item.id,
                        note: item.note,
                        order_no: item.order_no,
                        status: item.status,
                        program: program,
                    }
                    userSelectedSchoolsList.value.push(finalProgram);
                })
                checklistPagination.value = response.data.pagination;
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

    watch(() => appStore.authenticatedUser, () => {
        isSchoolListPublic.value = !appStore.authenticatedUser;
        removePublicUserData();
    })

    // watch(() => appStore.userData, () => {
    //     if (appStore.userData?.educational_records.next_program_titles.length) {
    //         enginePosition.value = 'post'
    //     } else {
    //         enginePosition.value = 'pre'
    //     }
    // })

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
        checklistPagination,
        sortParam,
        isFinalEnginCall,
        programTitleParentId,
        isPublicMajorEnable,
        selectedPublicMajors,
        majorsList,
        filterSchoolsList,
        userSelectedSchoolsList,
        userSelectedSchoolsListPublic,
        isSchoolDetailModal,
        allChipsFilled,
        getChecklistProgram,
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

export default useSchoolListStore;