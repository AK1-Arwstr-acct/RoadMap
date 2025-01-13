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
  countries: string[];
  process: string;
}

interface PocChat {
  isSender: boolean,
  text: string,
}

interface Tasks {
  heading: string;
  category: string;
  estimated_time: string;
  type: string;
  task_description: string;
  checked: boolean;
  resources?: Resources[]
}

interface Resources {
  text: string;
  link: string;
}

interface UserData {
  id: number | null;
  name: string | null;
  user_name: string | null;
  email: string | null;
  created_at: string | null;
  oldUser: boolean | null;
}

export { OptionAttributes, FormData, PocChat, Tasks, UserData }