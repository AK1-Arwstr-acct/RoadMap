interface OptionAttributes {
  value: string;
  label: string;
  description?: string;
}

interface FormData {
  budget: OptionAttributes | null;
  grade: OptionAttributes | null;
  gpa: number | null;
  ielts: String | null;
  countries: String[];
  process: String;
}

export { OptionAttributes, FormData }