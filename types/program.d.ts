interface Program {
    description: string | null;
    fee: number;
    id: number;
    in_state_fee?: number | null;
    school: School;
    school_ranking: number | null;
    title: string;
    program_title: string;
    super_meta_title: string;
    class_grades: ClassGrade[];
    currency: {
        title: string;
        symbol: string;
    }
}
interface School {
    id: number;
    name: string;
    user_name: string;
    avatar: string | null;
    number_of_students?: number | null;
    average_net_price?: number;
    avg_act_composite?: number | null;
    avg_cgpa?: number | null;
    avg_sat_composite?: number | null;
    cover_photo: null;
    have_own_application?: null;
    use_coalition_app?: boolean | null;
    use_common_app?: boolean | null;
    address: Address;
    admission_stats: AdmissionStats;
}

export interface ClassGrade {
    id: number;
    title: string;
}

interface Address {
    city?: string;
    country: string;
    country_code: string;
    lat: string | null;
    lng: string | null;
    state: string;
    phone_number?: string | null;
}

interface RecommendationSchoolsPagination {
    current_page: number;
    last_page: number;
    path: string;
    per_page: number;
}

interface AdmissionStats {
    acceptance_rate: number | null;
    average_scores: {
        sat: number | null;
        ielts: number | null;
        gpa: number | null;
    };
}

interface CampusLife {
    housing: string | null;
    extra_curriculum: string | null;
}
interface CampusOverview {
    location: string | null;
    type: string | null;
    total_students: number | null;
}

interface CareerOutcomes {
    employment_rate: number | null;
    median_salary: number | null;
}
interface FinancialAidCost {
    average_financial_aid: number | null;
    housing: number | null;
    meals: number | null;
    housing_and_meal: number;
}

interface Surroundings {
    option_1: string;
    option_2: string;
}
interface SchoolDetail {
    id: number;
    name: string;
    about: {
        website: string | null;
        country: string;
        state: string;
        description: string | null;
    };
    avatar: string;
    email: string;
    ranking: string | null;
    user_name: string;
    cover_photo: string | null;
    admission_stats: AdmissionStats;
    campus_life: CampusLife;
    campus_overview: CampusOverview;
    career_outcomes: CareerOutcomes;
    financial_and_aid_cost: FinancialAidCost;
    surroundings: Surroundings;
}
export { Program, RecommendationSchoolsPagination, SchoolDetail };