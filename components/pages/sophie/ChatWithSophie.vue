<template>
  <div
    class="bg-white size-full overflow-hidden flex"
    :class="{
      'rounded-xl drop-shadow-lg relative max-w-[1302px] max-h-[904px] pt-8':
        isModal,
    }"
  >
    <div
      v-if="isModal"
      @click="emit('openSophieModal')"
      class="absolute right-4 top-4 cursor-pointer"
    >
      <IconCross fill="#A4A7AE" width="28" height="28" />
    </div>
    <div
      class="w-[300px] hidden md:block"
      :class="{ 'pointer-events-none': isChatLoading }"
    >
      <SophieHistory
        @newChat="handelNewChat"
        @chatDetail="chatDetail"
        :chatHistoryArray="chatHistoryArray"
        :isModal="isModal"
      />
    </div>
    <div
      class="flex-1 pb-4 px-5 w-full max-w-[710px] mx-auto hidden md:block"
      :class="[isModal ? 'pt-[68px]' : 'pt-4']"
    >
      <SophieChat
        :isNewChat="isNewChat"
        :singleChatDetail="singleChatDetail"
        :isModal="isModal"
        :isSummarizeOverview="isSummarizeOverview"
        @isChatLoading="(value) => (isChatLoading = value)"
      />
    </div>
    <!-- Mobile view -->
    <div class="md:hidden w-full flex flex-col gap-1">
      <div class="py-4 px-6 border-b border-gray-200">
        <div
          class="border border-[#F5F5F5] bg-[#FAFAFA] rounded-lg p-1 flex gap-2"
        >
          <button
            class="rounded-md p-2 font-semibold flex-1 transition-all ease-in-out duration-100"
            :class="[
              chatOrHistory === 'messages'
                ? 'text-[#414651] bg-white'
                : 'text-[#717680]',
            ]"
            @click="chatOrHistory = 'messages'"
          >
            Messages
          </button>
          <button
            class="rounded-md p-2 font-semibold flex-1 transition-all ease-in-out duration-100"
            :class="[
              chatOrHistory === 'history'
                ? 'text-[#414651] bg-white'
                : 'text-[#717680]',
            ]"
            @click="chatOrHistory = 'history'"
          >
            History
          </button>
        </div>
      </div>
      <div class="flex-1 overflow-hidden" :class="{ 'w-screen': !isModal }">
        <div
          v-show="chatOrHistory === 'history'"
          class="h-full"
          :class="{
            'pointer-events-none': isChatLoading,
            'w-screen': !isModal,
          }"
        >
          <SophieHistory
            @newChat="handelNewChat"
            @chatDetail="chatDetail"
            :chatHistoryArray="chatHistoryArray"
            :isModal="isModal"
          />
        </div>
        <div
          v-show="chatOrHistory === 'messages'"
          class="flex-1 py-4 px-5 w-full h-full"
        >
          <SophieChat
            :isNewChat="isNewChat"
            :singleChatDetail="singleChatDetail"
            :isModal="isModal"
            :isSummarizeOverview="isSummarizeOverview"
            @isChatLoading="(value) => (isChatLoading = value)"
          />
        </div>
      </div>
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
  isSummarizeOverview: {
    type: Boolean,
    default: false,
  },
});

const isChatLoading = ref<boolean>(false);
const isNewChat = ref<boolean>(false);
const chatHistoryArray = ref<{ id: number; title: string }[]>([]);
const singleChatDetail = ref<ChatDetail[]>([]);
const chatOrHistory = ref<"messages" | "history">("messages");

const handelNewChat = () => {
  isNewChat.value = !isNewChat.value;
  chatOrHistory.value = "messages";
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
  } finally {
    chatOrHistory.value = "messages";
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
