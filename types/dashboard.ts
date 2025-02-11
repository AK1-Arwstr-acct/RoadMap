export type TabName =
    | "home"
    | "sophie"
    | "application_tracker"
    | "schools_list"
    | "setting";

interface TabList {
    name: TabName;
    icon: Component;
}

export type { TabList }