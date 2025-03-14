import { defineStore } from "pinia";

const useEssayStore = defineStore("essayStore", () => {

    const essayProgress = ref<number>(0);
    const finalEssay = ref<{ title: string, essayText: string }>()
    const essayPayload = ref()

    const setFinalEssay = (data: { title: string, essayText: string }) => {
        finalEssay.value = data;
    }

    return {
        essayPayload,
        essayProgress,
        finalEssay,
        setFinalEssay
    }
});

export default useEssayStore;