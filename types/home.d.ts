interface OptionAttributes {
  value: string;
  label: string;
  description?: string;
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

interface UserLoginData {
  id: number | null;
  name: string | null;
  user_name: string | null;
  email: string | null;
  created_at: string | null;
  oldUser: boolean | null;
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
  test_scores: TestScores[];
  want_to_study_countries: StudyCountry[];
}
interface UserData {
  id: number;
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
}


export { OptionAttributes, FormData, PocChat, Tasks, CurrentClassGrade, TestScores, ClassGrades, UserLoginData, UserData }