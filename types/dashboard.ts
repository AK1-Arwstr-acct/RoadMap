export type TabName =
    | "home"
    | "sophie"
    | "application_tracker"
    | "schools_list"
    | "setting"
    | "ai_essay_editor"
    | "user_profile";

interface TabList {
    name: TabName;
    icon: Component;
}

interface Category {
    id: number;
    title: string;
}

interface Resources {
    link: string;
    text: string;
}
interface Task {
    id: number;
    title: string;
    description: string;
    estimated_time: string;
    type: string;
    button_text: string;
    checked: boolean;
    remarks: string | null;
    resources: Resources[];
    category: Category;
    users: [];
}
interface Application {
    id: number;
    title: string;
    country_title: string | null;
    description: string;
    disabled: number;
    view: number;
    tasks: Task[];
}

export type { TabList, Application, Task }