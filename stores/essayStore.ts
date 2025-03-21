import axios from "axios";
import { defineStore } from "pinia";
import type { EssayData } from "~/types/home";
import useAppStore from "./AppStore";

const useEssayStore = defineStore("essayStore", () => {
    const { api } = useApi();
    const { showToast } = useToast();
    const appStore = useAppStore();

    const isPublic = ref<boolean>(!appStore.authenticatedUser);
    const tryFreeArrowster = ref<boolean>(false);
    const publicUserToken = ref<string>("");
    const essayProgress = ref<number>(0);
    const userEssayList = ref<EssayData[]>([]);
    const finalEssay = ref<{ title: string, essayText: string }>()
    const essayPayload = ref();

    const setFinalEssay = (data: { title: string, essayText: string }) => {
        finalEssay.value = data;
    }

    const getEssayList = async () => {
        try {
            const response = await api.get("/api/v1/student/get-my-generated-essay");
            userEssayList.value = response.data.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const errorMessage = errorList(error);
                showToast(errorMessage, {
                    type: "error",
                });
            }
        }
    }

    watch(() => appStore.authenticatedUser, () => {
        isPublic.value = !appStore.authenticatedUser
    })

    return {
        isPublic,
        tryFreeArrowster,
        publicUserToken,
        essayPayload,
        essayProgress,
        finalEssay,
        userEssayList,
        setFinalEssay,
        getEssayList
    }
});

export default useEssayStore;