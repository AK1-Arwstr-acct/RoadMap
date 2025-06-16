import { defineStore } from "pinia"
import useAppStore from "./AppStore";
import type { Task } from "~/types/dashboard";

const useSophieStore = defineStore("sophieStore", () => {

    const appStore = useAppStore();

    const isSophiePublic = ref<boolean>(!appStore.authenticatedUser);
    const roadmapTaskDetail = ref<Task | null>(null);
    const openSophieModal = ref<boolean>(false);


    watch(() => appStore.authenticatedUser, () => {
        isSophiePublic.value = !appStore.authenticatedUser;
    })

    return {
        isSophiePublic,
        roadmapTaskDetail,
        openSophieModal
    }
});

export default useSophieStore;