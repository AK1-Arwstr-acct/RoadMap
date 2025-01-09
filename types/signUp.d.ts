import type { OptionAttributes } from "./home";

interface Country {
    id: number,
    title: string,
    phone_code: string,
    flag: string
}

interface SignUpForm {
    userName: string,
    selectedGrade: OptionAttributes | null,
    email: string,
    password: string,
}

export { Country, SignUpForm };