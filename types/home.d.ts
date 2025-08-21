import type { Component } from "vue";

interface OptionAttributes {
  value: string;
  label: string;
  description?: string;
  icon?: Component;
}
interface CountriesOptionAttributes {
  value: number[];
  label: string;
  description?: string;
  icon?: string | Component;
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
interface SophieChat {
  isSender: boolean,
  text: string,
}
interface MajorsSelectionChat {
  isSender: boolean,
  text: string,
  isTyping?: boolean,
  message_support_id?: string,
  showDiscoverMore?: boolean,
}

interface FollowUps {
  questions: string[],
  title: string
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
interface Majors {
  id: number;
  title: string;
}
interface CurrentLocation {
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
    id: number;
  };
  next_program_titles: Majors[];
  super_meta_category: {
    title: string;
    id: number;
  };
  test_scores: TestScores[];
  want_to_study_countries: StudyCountry[];
}
interface AuthUserData {
  id: number;
  uuid: string;
  name: string;
  user_name: string;
  email: string;
  created_at: string;
  oldUser: boolean;
  onboarded: boolean;
  currentPlan: {
    plan_id: number;
    plan_price: number;
    plan_title: string;
  };
  isSchoolListVisited: boolean;
  isAnyCollegeAdded: boolean;
}
interface UserData {
  id: number;
  avatar: string;
  cover_photo: string;
  current_location: CurrentLocation;
  name: string;
  email: string;
  isEmailVerified: boolean;
  phone_number: string | null;
  user_name: string;
  first_name: string;
  last_name: string;
  gender: string;
  enroll_year: string;
  current_situation: string;
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

interface ChatDetail {
  id: number;
  me: string;
  sophie: string;
}

interface FilterKey {
  [key: `sort_by_${"ranking" | "price"}`]: "DESC" | "ASC";
}

interface EssayData {
  id: number;
  any_regrets: string;
  core_message: string;
  dob: string;
  dream_school: string;
  future_goals: string | null;
  generated_essay: string;
  lesson_from_regrets: string;
  major: string;
  personal_statement: string;
}

interface Plan {
  starterPlan: string;
  standardPlan: string;
  advancedPlan: string;
  title: string;
}

interface programOptions {
  value: number;
  label: string;
  parent: number;
}

interface Tabs {
  name: string;
  label: string;
  icon: Component
}

type MajorsTabs = 'chat' | 'guide';

export type LanguageLocale = typeof ALL_LOCALES_LANGUAGE[number];

export { OptionAttributes, FormData, PocChat, Tasks, CurrentClassGrade, TestScores, ClassGrades, UserData, AuthUserData, UserInput, CountriesOptionAttributes, FilterKey, SophieChat, MajorsSelectionChat, FollowUps, ChatDetail, EssayData, Plan, programOptions, Tabs, MajorsTabs }