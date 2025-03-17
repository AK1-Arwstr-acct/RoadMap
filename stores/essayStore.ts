import axios from "axios";
import { defineStore } from "pinia";

const useEssayStore = defineStore("essayStore", () => {
    const { api } = useApi();
    const { showToast } = useToast();

    const essayProgress = ref<number>(0);
    const userEssayList = ref([])
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

    return {
        essayPayload,
        essayProgress,
        finalEssay,
        userEssayList,
        setFinalEssay,
        getEssayList
    }
});

export default useEssayStore;