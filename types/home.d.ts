interface OptionAttributes {
  value: string;
  label: string;
  description?: string;
  icon?: string;
}
interface CountriesOptionAttributes {
  value: number[];
  label: string;
  description?: string;
  icon?: string;
}
interface FormData {
  budget: OptionAttributes | null;
  grade: OptionAttributes | null;
  gpa: string;
  ielts: string | null;
  countries: number[];
  process: string;
}

interface PocChat {
  isSender: boolean,
  text: string,
}

interface Tasks {
  id: number;
  users: {
    id: number;
  };
  heading: string;
  category: {
    id: number;
    title: string
  };
  estimated_time: string;
  type: string;
  title: string;
  task_description: string;
  checked: boolean;
  disabled: 0 | 1;
  resources?: Resources[]
}

interface Resources {
  text: string;
  link: string;
}

interface ClassGrades {
  value: string;
  label: string;
}

// * user data interfaces
interface CurrentClassGrade {
  id: number;
  class_name: string;
}
interface TestScores {
  title: string;
  score: number;
}
interface StudyCountry {
  id: number;
  title: string;
}
interface EducationalRecords {
  annual_min_budget: number;
  annual_max_budget: number;
  cgpa: number;
  current_class_grade: CurrentClassGrade;
  next_class_grade: {
    class_name: string;
    id: numbe;
  };
  test_scores: TestScores[];
  want_to_study_countries: StudyCountry[];
}
interface UserData {
  id: number;
  avatar: string;
  name: string;
  email: string;
  phone_number: string | null;
  user_name: string;
  first_name: string;
  last_name: string;
  gender: string;
  dob: string | null;
  starting_date: string | null;
  educational_records: EducationalRecords;
  created_at: string;
  onboarded: boolean;
  uuid: string;
}

interface UserInput {
  name: string;
  email: string;
  password: string;
}

export type LanguageLocale = typeof ALL_LOCALES_LANGUAGE[number];

export { OptionAttributes, FormData, PocChat, Tasks, CurrentClassGrade, TestScores, ClassGrades, UserData, UserInput, CountriesOptionAttributes }