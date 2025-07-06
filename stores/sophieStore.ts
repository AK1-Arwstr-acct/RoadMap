import { defineStore } from "pinia"
import useAppStore from "./AppStore";
import type { Task } from "~/types/dashboard";

const useSophieStore = defineStore("sophieStore", () => {

    const {api} = useApi();
    const appStore = useAppStore();
    const route = useRoute();

    const isSophiePublic = ref<boolean>(!appStore.authenticatedUser);
    const roadmapTaskDetail = ref<Task | null>(null);
    const openSophieModal = ref<boolean>(false);
    const tasksWithCompletedSophie = ref<number[]>([]);

    // for Pre question 
    const preQuestionSelected = ref<string>('');

    //  for scholarship button
    const scholarshipSophieModal = ref<boolean>(false);

    const checkPublicToken = async () => {
        const publicToken = useCookie("publicToken");
        if (!publicToken.value) {
            const response = await api.get("/api/v1/session-based-journey/session");
            if (response.data) {
                const tokenValue = JSON.stringify(response.data.data.token);
                const token = useCookie("publicToken", {
                    maxAge: 10800,
                    httpOnly: false,
                    secure: true,
                });
                token.value = tokenValue;
                await nextTick();
                if (route.query.query) {
                    return true;
                } else return false;
            }
        }
    }

    watch(() => appStore.authenticatedUser, () => {
        isSophiePublic.value = !appStore.authenticatedUser;
    })

    return {
        preQuestionSelected,
        isSophiePublic,
        tasksWithCompletedSophie,
        roadmapTaskDetail,
        openSophieModal,
        scholarshipSophieModal,
        checkPublicToken
    }
});

export default useSophieStore;