import { defineStore } from "pinia";
import type { AuthUserData, LanguageLocale, UserData } from "../types/home";

const useAppStore = defineStore("appStore", () => {
	const { api } = useApi();
	const { $i18n } = useNuxtApp();
	const tokenExists = useCookie("token");

	const theme = ref<'theme-light' | 'theme-dark'>('theme-light');

	const authUserData = ref<AuthUserData>()
	const userData = ref<UserData>()
	const userImagePreview = ref<string>('');
	const userCoverPhotoPreview = ref<string>('');
	const authenticatedUser = ref<boolean>(tokenExists.value ? true : false);
	const isFeatureChangeFromTasks = ref<boolean>(false);

	// modal for first time user
	const firstTimeUser = ref<boolean>(false);

	// for Mentorship popup
	const isMentorshipPopup = ref<boolean>(false);
	const popupTimer = ref<number>(15000);

	// modals
	const progressSoftPaywall = ref<boolean>(false);
	const resourcesSoftPaywall = ref<boolean>(false);
	const featureSoftPaywall = ref<boolean>(false);
	const paywallOnLastScreen = ref<string>('')

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

	const getAuthUserData = async () => {
		const tokenExists = useCookie("token");
		if (tokenExists.value) {
			const response = await api.get("/api/v1/user")
			authUserData.value = response.data.data
		} else {
			authUserData.value = undefined;
		}
	}

	const getUserData = async () => {
		const tokenExists = useCookie("token");
		if (tokenExists.value) {
			const response = await api.get("/api/v1/student/basic-info")
			userData.value = response.data.data
		} else {
			userData.value = undefined;
		}
		return userData.value;
	}

	const checkAuthenticatedUser = () => {
		const tokenExists = useCookie("token");
		tokenExists.value ? authenticatedUser.value = true : authenticatedUser.value = false;
	}

	watch(() => authUserData.value, () => {
		if (authUserData.value) {
			firstTimeUser.value = !authUserData.value.isSchoolListVisited
		} else {
			firstTimeUser.value = false
		}
	})

	onMounted(() => {
		checkAuthenticatedUser();
		// theme
		const saved = localStorage.getItem('theme')
		if (saved === 'theme-dark' || saved === 'theme-light') {
			theme.value = saved
			document.documentElement.classList.add(saved)
		} else {
			theme.value = 'theme-light'
			document.documentElement.classList.add('theme-light')
		}
	})

	return {
		theme,
		userImagePreview,
		userCoverPhotoPreview,
		authenticatedUser,
		authUserData,
		userData,
		isFeatureChangeFromTasks,
		isMentorshipPopup,
		popupTimer,
		progressSoftPaywall,
		resourcesSoftPaywall,
		featureSoftPaywall,
		paywallOnLastScreen,
		firstTimeUser,
		checkAuthenticatedUser,
		setUserImagePreview,
		setUserCoverPhotoPreview,
		getAuthUserData,
		getUserData,
		setLocale
	}
});

export default useAppStore;