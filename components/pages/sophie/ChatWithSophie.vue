<template>
  <div
    class="bg-white size-full overflow-hidden flex"
    :class="{
      'rounded-xl drop-shadow-lg relative max-w-[1302px] max-h-[904px] pt-12':
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
    <div class="w-full flex flex-col gap-1">
      <div
        v-if="!isTaskChat"
        class="md:pt-4 pb-4 px-3 sm:px-6 border-b border-gray-200"
      >
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
            {{ $t("sophie_page.messages") }}
          </button>
          <button
            class="rounded-md p-2 font-semibold flex-1 transition-all ease-in-out duration-100"
            :class="[
              chatOrHistory === 'history'
                ? 'text-[#414651] bg-white'
                : 'text-[#717680]',
            ]"
            @click="
              sophieStore.isSophiePublic && !isModal
                ? (appStore.resourcesSoftPaywall = true)
                : (chatOrHistory = 'history')
            "
          >
            {{ $t("sophie_page.history") }}
          </button>
        </div>
      </div>
      <div class="flex-1 overflow-hidden">
        <div
          v-show="chatOrHistory === 'history'"
          class="h-full"
          :class="{
            'pointer-events-none': isChatLoading,
            '': !isModal,
          }"
        >
          <SophieHistory
            v-if="!isTaskChat"
            @newChat="handelNewChat"
            @chatDetail="chatDetail"
            :chatHistoryArray="chatHistoryArray"
            :isModal="isModal"
          />
          <div v-else class="md:p-6 size-full p-4">
            <SophieChat
              :isNewChat="isNewChat"
              :singleChatDetail="specificTaskChat"
              :isModal="isModal"
              :isSummarizeOverview="isSummarizeOverview"
              @isChatLoading="(value) => (isChatLoading = value)"
              :isReadOnly="true"
            />
          </div>
        </div>
        <div
          v-show="chatOrHistory === 'messages'"
          class="flex-1 md:p-6 w-full h-full p-4"
        >
          <SophieChat
            :isNewChat="isNewChat"
            :singleChatDetail="isTaskChat ? specificTaskChat : singleChatDetail"
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
import useSophieStore from "~/stores/sophieStore";
import useAppStore from "~/stores/AppStore";

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
const appStore = useAppStore();
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
  isTaskChat: {
    type: Boolean,
    default: false,
  },
});

const isChatLoading = ref<boolean>(false);
const isNewChat = ref<boolean>(false);
const chatHistoryArray = ref<{ id: number; title: string }[]>([]);
const specificTaskChat = ref<ChatDetail[]>([]);
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
      if (response) {
        chatHistoryArray.value = response.data.data;
      }
    } else {
      if (!sophieStore.roadmapTaskDetail || props.isModal) {
        response = await api.get("/api/v1/ai-conversation/get-sophie-sessions");
        if (response) {
          chatHistoryArray.value = response.data.data;
        }
      } else {
        response = await api.get(
          `/api/v1/ai-conversation/get-sophie-sessions/chat/${sophieStore.roadmapTaskDetail?.id}?showRoadmap=yes`
        );
        if (response) {
          specificTaskChat.value = response.data.data;
        }
      }
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

watch(
  () => sophieStore.roadmapTaskDetail,
  () => {
    chatOrHistory.value = "messages";
    if (
      sophieStore.roadmapTaskDetail?.feature_state === "sophie" &&
      !sophieStore.isSophiePublic
    ) {
      getChatHistory();
    }
  }
);

onMounted(async () => {
  if (!sophieStore.isSophiePublic) {
    getChatHistory();
  }
});
</script>
