import { defineStore } from "pinia";
import type { LanguageLocale, UserData } from "../types/home";

const useAppStore = defineStore("appStore", () => {
	const { api } = useApi();
	const { $i18n } = useNuxtApp();
	const userData = ref<UserData>()
	const userImagePreview = ref<string>('');
	const userCoverPhotoPreview = ref<string>('');

	const setUserImagePreview = (data: string) => {
		userImagePreview.value = data
	}
	const setUserCoverPhotoPreview = (data: string) => {
		userCoverPhotoPreview.value = data
	}

	const setLocale = (newLocale: LanguageLocale) => {
		const matchedLocale = ALL_LOCALES.find(locale => locale.value === newLocale);

		if (matchedLocale) {
			$i18n.setLocale(matchedLocale.value as "en" | "vi");
		} else {
			$i18n.setLocale("en");
		}
	};

	const getUserData = async () => {
		const tokenExists = useCookie("token");
		if (tokenExists.value) {
			const response = await api.get("/api/v1/student/basic-info")
			userData.value = response.data.data
		} else {
			userData.value = undefined;
		}
	}

	return {
		userImagePreview,
		userCoverPhotoPreview,
		userData,
		setUserImagePreview,
		setUserCoverPhotoPreview,
		getUserData,
		setLocale
	}
});

export default useAppStore;