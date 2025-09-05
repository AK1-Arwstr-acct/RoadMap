import type { OptionAttributes } from "./home";

interface CounselorStudent {
    name: string;
    date_of_birth: {
        day: string;
        year: string;
        month: OptionAttributes | null;
    };
    phone_number: string;
    email: string;
    legal_address: string;
    current_address: string;
    nationality: OptionAttributes | null;
    permanent_residency: "yes" | "no";
    residency_country_name: OptionAttributes | null;
    passport_number: string;
    recent_school: string;
    level_of_study: OptionAttributes | null;
    curriculum: string;
    gpa: string;
    intended_study_program: OptionAttributes | null;
    intended_major: string;
    country_destinations: number[];
    annual_budget: number | null;
    earliest_intake: OptionAttributes | null;
    post_graduation_plan: string;
    english_language_test: {
        status: OptionAttributes | null;
        test_type: OptionAttributes | null;
        test_date: {
            day: string;
            year: string;
            month: OptionAttributes | null;
        };
        test_scrore: string;
    },
    standardized_test: {
        status: OptionAttributes | null;
        test_type: OptionAttributes | null;
        test_date: {
            day: string;
            year: string;
            month: OptionAttributes | null;
        };
        test_scrore: string;
    },
    // 
    family_visited_before: string;
    denied_visa_before: "yes" | "no";
    detail_for_visa_rejection: string;
    father_occupation: string;
    mother_occupation: string;
    parents_total_income: number | null;
    saving_account_amount: number | null;
    // 
    name_on_contract: string;
    contract_legal_address: string;
    contract_email: string;
    contract_phoneNumber: string;
    contract_holder: {
        id: string;
        issue_date: string;
        place_of_issue: string;
    },
    students_national_id: {
        id: string;
        issue_date: string;
        place_of_issue: string;
    },
    name_on_bank_account: string;
    bank_account_number: string;
    bank_name: string;
    onboarding_date: OptionAttributes | null;
}

export type { CounselorStudent }