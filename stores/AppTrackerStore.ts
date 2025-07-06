import axios from "axios";
import { defineStore } from "pinia";
import type { Application } from "~/types/dashboard";
import useAppStore from "./AppStore";

const useAppTrackerStore = defineStore("appTrackerStore", () => {
    const { api } = useApi();
    const { showToast } = useToast();
    const appStore = useAppStore();

    const isRoadmapSidebarOPen = ref<boolean>(true);
    const ongoingTrack = ref<boolean>(false);
    const taskActiveStates = ref<Record<number, boolean>>({});
    const roadmapData = ref<Application[]>([]);
    const preApplication = ref<Application>();
    const applicationList = ref<Application[]>([]);
    const postApplication = ref<Application>();
    // layout sidebar
    const isSidebarOpen = ref<boolean>(false);

    // for home preQuestion
    const taskFromHomeQuestion = ref<number | null>(null)

    const getRoadmapData = async () => {
        try {
            const response = await api.get(`${appStore.authenticatedUser ? '/api/v1/roadmap/tasks' : 'api/v1/session-based-journey/roadmap/tasks'}`);
            roadmapData.value = response.data.data;
            preApplication.value = roadmapData.value.find((item: Application) => item.title.toLowerCase().includes('pre'));
            postApplication.value = roadmapData.value.find((item: Application) => item.title.toLowerCase().includes('post'));
            applicationList.value = roadmapData.value.filter((item: Application) => item.country_title !== null)


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
        isRoadmapSidebarOPen,
        ongoingTrack,
        taskActiveStates,
        preApplication,
        postApplication,
        applicationList,
        isSidebarOpen,
        roadmapData,
        taskFromHomeQuestion,
        getRoadmapData
    }
});

export default useAppTrackerStore;