import { defineStore } from "pinia";
import type { LanguageLocale, UserData } from "../types/home";

const useAppStore = defineStore("appStore", () => {
	const { api } = useApi();
	const { $i18n } = useNuxtApp();
	const tokenExists = useCookie("token");

	const userData = ref<UserData>()
	const userImagePreview = ref<string>('');
	const userCoverPhotoPreview = ref<string>('');
	const authenticatedUser = ref<boolean>(tokenExists.value ? true : false );

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

	const checkAuthenticatedUser = () => {
		const tokenExists = useCookie("token");
		tokenExists.value ? authenticatedUser.value = true : authenticatedUser.value = false;
	}

	onMounted(()=>{
		checkAuthenticatedUser();
	})

	return {
		userImagePreview,
		userCoverPhotoPreview,
		authenticatedUser,
		userData,
		checkAuthenticatedUser,
		setUserImagePreview,
		setUserCoverPhotoPreview,
		getUserData,
		setLocale
	}
});

export default useAppStore;