import type { OptionAttributes } from "./home";

export interface Country {
    id: number,
    title: string,
    phone_code: string,
    flag: string
}

export interface UserSignupDetail {
    name: string;
    email: string;
    password: string;
}

export interface AuthUser {
    id: number | null;
    uuid: string | null;
    name: string | null;
    user_name: string | null;
    email: string | null;
    created_at: string | null;
    oldUser: boolean | null;
    onboarded: boolean | null;
}