export const ALL_LOCALES = [
    { value: 'en', label: 'English', id: 1, icon: "/images/countries/united-states.png", default: true },
    { value: 'vi', label: 'Vietnamese', id: 2 , icon: "/images/countries/vietnamese.png",}
];

export const ALL_LOCALES_LANGUAGE = ALL_LOCALES.map(item => item.value);

export const DEFAULT_LOCALE = ALL_LOCALES.filter(item => item.default)[0];