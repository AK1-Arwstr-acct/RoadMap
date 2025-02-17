interface Program {
    description: string | null;
    fee: number;
    id: number;
    in_state_fee: number | null;
    school: School;
    school_ranking: number;
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
    avatar: string;
    number_of_students: number | null;
    acceptance_rate: number | null;
    average_net_price: number;
    avg_act_composite: number | null;
    avg_cgpa: number;
    avg_sat_composite: number | null;
    cover_photo: null;
    have_own_application: null;
    use_coalition_app: boolean | null;
    use_common_app: boolean | null;
    address: Address;
}

export interface ClassGrade {
    id: number;
    title: string;
}

interface Address {
    city: string;
    country: string;
    lat: string;
    lng: string;
    state: string;
    phone_number: string | null;
}

interface RecommendationSchoolsPagination {
    current_page: number;
    last_page: number;
    path: string;
    per_page: number;
  }
export { Program, RecommendationSchoolsPagination };