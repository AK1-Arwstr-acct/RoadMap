<template>
  <div
    class="bg-white size-full overflow-hidden flex"
    :class="{ 'rounded-xl drop-shadow-lg relative': isModal }"
  >
    <div
      v-if="isModal"
      @click="emit('openSophieModal')"
      class="absolute right-4 top-4 cursor-pointer"
    >
      <IconCross fill="#A4A7AE" width="28" height="28" />
    </div>
    <div :class="['transition-all ease-in-out duration-200 overflow-hidden' , !isModal ? isSidebarOpen ? 'w-[300px]' : 'w-0' : 'w-[300px]']">
      <SophieHistory
        @newChat="handelNewChat"
        @chatDetail="chatDetail"
        :chatHistoryArray="chatHistoryArray"
      />
    </div>
    <div v-if="!isModal" @click="isSidebarOpen = !isSidebarOpen" class="p-2 ml-2 mt-2 shadow-md rounded-xl h-fit cursor-pointer">
      <IconSideBar class="invert" />
    </div>
    <div
      class="flex-1 pb-4 px-5 w-full max-w-[710px] mx-auto"
      :class="[isModal ? 'pt-[68px]' : 'pt-4']"
    >
      <SophieChat
        :isNewChat="isNewChat"
        :singleChatDetail="singleChatDetail"
        :isModal="isModal"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import axios from "axios";
import type { ChatDetail } from "~/types/home";

const { api } = useApi();
const { showToast } = useToast();

const emit = defineEmits(["openSophieModal"]);

const props = defineProps({
  isModal: {
    type: Boolean,
    default: false,
  },
});

const isNewChat = ref<boolean>(false);
const isSidebarOpen = ref<boolean>(false);
const chatHistoryArray = ref<{ id: number; title: string }[]>([]);
const singleChatDetail = ref<ChatDetail[]>([]);

const handelNewChat = () => {
  isNewChat.value = !isNewChat.value;
  getChatHistory();
};

const chatDetail = async (id: number) => {
  try {
    const response = await api.get(
      `/api/v1/ai-conversation/get-sophie-sessions/chat/${id}`
    );
    if (response) {
      singleChatDetail.value = response.data.data;
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage = error.message;
      showToast(errorMessage, {
        type: "warning",
      });
    }
  }
};

const getChatHistory = async () => {
  try {
    const response = await api.get(
      "/api/v1/ai-conversation/get-sophie-sessions"
    );
    if (response) {
      chatHistoryArray.value = response.data.data;
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage = error.message;
      showToast(errorMessage, {
        type: "warning",
      });
    }
  }
};

onMounted(async () => {
  getChatHistory();
});
</script>
