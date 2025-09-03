import type { CounselorStudent } from "~/types/counselor";
import useAppStore from "./AppStore";
import type { UserData } from "~/types/home";


const useCounselorStudentStore = defineStore("counselorStudentStore", () => {

    const appStore = useAppStore();
    const { api } = useApi();

    const moveToNextStep = ref<boolean>(false);
    const onboardingStep = ref<number>(1);
    const onBoardingData = ref<CounselorStudent>({
        name: "",
        date_of_birth: { day: "", year: "", month: null },
        phone_number: "",
        email: "",
        legal_address: "",
        current_address: "",
        nationality: "",
        permanent_residency: "no",
        residency_country_name: "",
        passport_number: "",
        recent_school: "",
        level_of_study: null,
        curriculum: "",
        gpa: "",
        intended_study_program: null,
        intended_major: "",
        country_destinations: [],
        annual_budget: "",
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

    watch(() => appStore.userData, () => {
        onBoardingData.value.name = appStore.userData?.name || "";
        onBoardingData.value.email = appStore.userData?.email || "";
        onBoardingData.value.phone_number = appStore.userData?.phone_number || "";
    })

    return {
        moveToNextStep,
        onboardingStep,
        onBoardingData,
    }
})

export default useCounselorStudentStore;