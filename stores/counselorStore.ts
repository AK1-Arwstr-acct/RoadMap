import type { UserData } from "~/types/home";

const useCounselorStore = defineStore("coounselorStore", () => {

    const { api } = useApi();

    const isCounselorMenuOpen = ref<boolean>(false);
    const autoCloseSidebar = ref<boolean>();
    const isCreateNewStudent = ref<boolean>(false);
    const userData = ref<UserData>()

    const getUserData = async () => {
        // const tokenExists = useCookie("token");
        // if (tokenExists.value) {
        //     const response = await api.get("/api/v1/student/basic-info")
        //     userData.value = response.data.data
        // } else {
        //     userData.value = undefined;
        // }
        // return userData.value;
    }

    return {
        isCounselorMenuOpen,
        autoCloseSidebar,
        isCreateNewStudent,
        userData,
        getUserData
    }
})

export default useCounselorStore;