import type { OptionAttributes } from "./home";

export interface Country {
    id: number,
    title: string,
    phone_code: string,
    country_code: string,
    flag: string
}

export interface UserSignupDetail {
    name: string;
    email: string;
    password: string;
}