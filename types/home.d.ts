interface OptionAttributes {
  value: string;
  label: string;
  description?: string;
}

interface FormData {
  budget: OptionAttributes | null;
  grade: OptionAttributes | null;
  countries: String[];
}

export { OptionAttributes, FormData }