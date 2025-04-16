import { defineStore } from "pinia"
import useAppStore from "./AppStore";

const useSophieStore = defineStore("sophieStore", () => {

    const appStore = useAppStore();

    const isSophiePublic = ref<boolean>(!appStore.authenticatedUser);

    watch(() => appStore.authenticatedUser, () => {
        isSophiePublic.value = !appStore.authenticatedUser;
    })

    return {
        isSophiePublic,
    }
});

export default useSophieStore;