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
      v-if="deviceType !== 'mobile'"
      class="w-[300px]"
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
      v-if="deviceType !== 'mobile'"
      class="flex-1 pb-4 px-5 w-full"
      :class="[isModal ? 'pt-[68px]' : 'pt-4']"
    >
      <SophieChat
        :isNewChat="isNewChat"
        :singleChatDetail="singleChatDetail"
        :isModal="isModal"
        :isTokenLoaded="isTokenLoaded"
        :isSummarizeOverview="isSummarizeOverview"
        @isChatLoading="(value) => (isChatLoading = value)"
      />
    </div>
    <!-- Mobile view -->
    <div v-if="deviceType === 'mobile'" class="w-full flex flex-col gap-1">
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
            :isTokenLoaded="isTokenLoaded"
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
import useSophieStore from "~/stores/sophieStore";

useHead(
  computed(() => ({
    link: [
      {
        rel: "preload",
        href: "/images/sophie-chat.png",
        as: "image",
      },
    ],
  }))
);

const { api } = useApi();
const { showToast } = useToast();
const sophieStore = useSophieStore();
const route = useRoute();

const emit = defineEmits(["openSophieModal"]);
const deviceType = useDeviceType();

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

const isTokenLoaded = ref<boolean>(false);
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
    let response;
    if (sophieStore.isSophiePublic) {
      const publicToken = useCookie("publicToken");
      response = await api.get(
        `/api/v1/session-based-journey/ai-conversation/get-sophie-sessions/chat/${id}`,
        {
          headers: {
            "X-auth-token": publicToken.value,
          },
        }
      );
    } else {
      response = await api.get(
        `/api/v1/ai-conversation/get-sophie-sessions/chat/${id}`
      );
    }
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
    let response;
    if (sophieStore.isSophiePublic) {
      const publicToken = useCookie("publicToken");
      response = await api.get(
        "/api/v1/session-based-journey/ai-conversation/get-sophie-sessions",
        {
          headers: {
            "X-auth-token": publicToken.value,
          },
        }
      );
    } else {
      response = await api.get("/api/v1/ai-conversation/get-sophie-sessions");
    }
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
  if (sophieStore.isSophiePublic) {
    const publicToken = useCookie("publicToken");
    if (!publicToken.value) {
      const response = await api.get("/api/v1/session-based-journey/session");
      if (response.data) {
        const tokenValue = JSON.stringify(response.data.data.token);
        const token = useCookie("publicToken", {
          maxAge: 10800,
          httpOnly: false,
          secure: true,
        });
        token.value = tokenValue;
        await nextTick();
        if (route.query.query) {
          isTokenLoaded.value = true;
        }
      }
    }
  }
  getChatHistory();
});
</script>
