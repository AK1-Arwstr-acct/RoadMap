import axios from "axios";
import { defineStore } from "pinia";

const useAppTrackerStore = defineStore("appTrackerStore", () => {
    const { api } = useApi();
    const { showToast } = useToast();


    const preApplication = ref([]);
    const applicationList = ref([]);
    const postApplication = ref([]);

    const getRoadmapData = async () => {
        try {
            const response = await api.get("/api/v1/roadmap/tasks");
            const roadmapData = response.data.data;
            preApplication.value = roadmapData.find((item) => item.title.toLowerCase().includes('pre'));
            postApplication.value = roadmapData.find((item) => item.title.toLowerCase().includes('post'));


        } catch (error) {
            if (axios.isAxiosError(error)) {
                const errorMessage = errorList(error);
                showToast(errorMessage, {
                    type: "error",
                });
            }
        }
    };

    return {
        preApplication,
        postApplication,
        applicationList,
        getRoadmapData
    }
});

export default useAppTrackerStore;