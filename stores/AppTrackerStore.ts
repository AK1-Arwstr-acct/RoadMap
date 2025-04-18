import axios from "axios";
import { defineStore } from "pinia";
import type { Application } from "~/types/dashboard";
import useAppStore from "./AppStore";

const useAppTrackerStore = defineStore("appTrackerStore", () => {
    const { api } = useApi();
    const { showToast } = useToast();
    const appStore = useAppStore();

    const ongoingTrack = ref<boolean>(false);
    const taskActiveStates = ref<Record<number, boolean>>({});
    const preApplication = ref<Application>();
    const applicationList = ref<Application[]>([]);
    const postApplication = ref<Application>();

    const getRoadmapData = async () => {
        try {
            const response = await api.get(`${appStore.authenticatedUser ? '/api/v1/roadmap/tasks' : 'api/v1/session-based-journey/roadmap/tasks'}`);
            const roadmapData = response.data.data;
            preApplication.value = roadmapData.find((item: Application) => item.title.toLowerCase().includes('pre'));
            postApplication.value = roadmapData.find((item: Application) => item.title.toLowerCase().includes('post'));
            applicationList.value = roadmapData.filter((item: Application) => item.country_title !== null)


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
        ongoingTrack,
        taskActiveStates,
        preApplication,
        postApplication,
        applicationList,
        getRoadmapData
    }
});

export default useAppTrackerStore;