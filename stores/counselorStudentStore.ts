import type { CounselorStudent } from "~/types/counselor";
import useAppStore from "./AppStore";
import type { UserData } from "~/types/home";
import axios from "axios";


const useCounselorStudentStore = defineStore("counselorStudentStore", () => {

    const appStore = useAppStore();
    const { api } = useApi();
    const { showToast } = useToast();

    const moveToNextStep = ref<boolean>(false);
    const onboardingStep = ref<number>(1);
    const sameAddress = ref<boolean>(false);
    const months = [
        { value: "01", label: "January" },
        { value: "02", label: "February" },
        { value: "03", label: "March" },
        { value: "04", label: "April" },
        { value: "05", label: "May" },
        { value: "06", label: "June" },
        { value: "07", label: "July" },
        { value: "08", label: "August" },
        { value: "09", label: "September" },
        { value: "10", label: "October" },
        { value: "11", label: "November" },
        { value: "12", label: "December" },
    ];
    const onBoardingData = ref<CounselorStudent>({
        name: "",
        date_of_birth: { day: "", year: "", month: null },
        phone_number: "",
        email: "",
        legal_address: "",
        current_address: "",
        nationality: null,
        permanent_residency: "no",
        residency_country_name: null,
        passport_number: "",
        recent_school: "",
        level_of_study: null,
        curriculum: "",
        gpa: "",
        intended_study_program: null,
        intended_major: "",
        country_destinations: [],
        annual_budget: null,
        earliest_intake: null,
        post_graduation_plan: "",
        english_language_test: {
            status: null,
            test_type: null,
            test_date: { day: "", year: "", month: null },
            test_scrore: "",
        },
        standardized_test: {
            status: null,
            test_type: null,
            test_date: { day: "", year: "", month: null },
            test_scrore: "",
        },
        family_visited_before: "",
        denied_visa_before: "no",
        detail_for_visa_rejection: "",
        father_occupation: "",
        mother_occupation: "",
        parents_total_income: null,
        saving_account_amount: null,
        name_on_contract: "",
        contract_legal_address: "",
        contract_email: "",
        contract_phoneNumber: "",
        contract_holder: {
            id: "",
            issue_date: "",
            place_of_issue: "",
        },
        students_national_id: {
            id: "",
            issue_date: "",
            place_of_issue: "",
        },
        name_on_bank_account: "",
        bank_account_number: "",
        bank_name: "",
        onboarding_date: null,
    });

    const getStudentInitailData = async () => {
        try {
            const response = await api.get(`/api/v1/counsellor-form/student`);
            if (response?.data.data) {
                const studentData = response.data.data
                const dateBreakDown = (date: string) => {
                    const [year, month, day] = date.split("-");
                    return { year, month, day };
                };
                const dateOfBirth = dateBreakDown(studentData.date_of_birth)
                const englishtestScore = dateBreakDown(studentData.english_test_date)
                const standardizedScore = dateBreakDown(studentData.standardized_test_date)
                onBoardingData.value = {
                    ...onBoardingData.value,
                    name: studentData.full_legal_name || "",
                    date_of_birth: { day: dateOfBirth.day || "", year: dateOfBirth.year || "", month: months.find(item => item.value === dateOfBirth.month) || null },
                    phone_number: studentData.phone_number || "",
                    email: studentData.email || "",
                    legal_address: studentData.legal_address || "",
                    current_address: studentData.current_address || "",
                    nationality: null,
                    permanent_residency: studentData.permanent_residency ? "yes" : "no",
                    residency_country_name: null,
                    passport_number: studentData.passport_number || "",
                    recent_school: studentData.most_recent_school || "",
                    level_of_study: null,
                    curriculum: studentData.curriculum ?? "",
                    gpa: studentData.current_gpa || "",
                    intended_study_program: null,
                    intended_major: studentData.super_meta_category_id ?? "",
                    country_destinations: studentData.preferred_country_ids || [],
                    annual_budget: studentData.max_budget,
                    earliest_intake: null,
                    post_graduation_plan: studentData.post_graduation_plan || "",
                    english_language_test: {
                        status: null,
                        test_type: null,
                        test_date: { day: englishtestScore.day || "", year: englishtestScore.year || "", month: months.find(item => item.value === englishtestScore.month) || null },
                        test_scrore: studentData.test_score || "",
                    },
                    standardized_test: {
                        status: null,
                        test_type: null,
                        test_date: { day: standardizedScore.day || "", year: standardizedScore.year || "", month: months.find(item => item.value === standardizedScore.month) || null },
                        test_scrore: studentData.standardized_score || "",
                    },
                }
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

    const getStudentFinanceData = async () => {
        try {
            const response = await api.get(`/api/v1/counsellor-form/student/family-finance-travels`);
            if (response?.data.data) {
                const studentData = response.data.data
                onBoardingData.value = {
                    ...onBoardingData.value,
                    family_visited_before: studentData.countries_visited[0] || "",
                    denied_visa_before: studentData.visa_denied ? "yes" : "no",
                    detail_for_visa_rejection: studentData.visa_denied_details || "",
                    father_occupation: studentData.father_occupation || "",
                    mother_occupation: studentData.mother_occupation || "",
                    parents_total_income: Math.round(Number(studentData.parents_monthly_income)) || null,
                    saving_account_amount: Math.round(Number(studentData.saving_account_amount)) || null,
                }
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
        moveToNextStep,
        onboardingStep,
        sameAddress,
        onBoardingData,
        getStudentInitailData,
        getStudentFinanceData,
    }
})

export default useCounselorStudentStore;