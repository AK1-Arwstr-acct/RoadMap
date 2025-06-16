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
      <div class="md:pt-4 pb-4 px-3 sm:px-6 border-b border-gray-200">
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
                ? (resourcesSoftPaywall = true)
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
          <div v-else class="md:p-6 size-full" :class="{ 'p-4': isModal }">
            <SophieChat
              :isNewChat="isNewChat"
              :singleChatDetail="specificTaskChat"
              :isModal="isModal"
              :isTokenLoaded="isTokenLoaded"
              :isSummarizeOverview="isSummarizeOverview"
              @isChatLoading="(value) => (isChatLoading = value)"
              :isReadOnly="true"
            />
          </div>
        </div>
        <div
          v-show="chatOrHistory === 'messages'"
          class="flex-1 md:p-6 w-full h-full"
          :class="{ 'p-4': isModal }"
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
  <Transition name="fade">
    <div
      v-if="resourcesSoftPaywall"
      class="fixed z-30 inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center px-5"
    >
      <div
        class="bg-white p-6 flex flex-col gap-8 rounded-xl w-full max-w-[400px] relative"
      >
        <button
          @click="resourcesSoftPaywall = false"
          class="absolute top-3 md:top-[18px] right-3 md:right-[18px]"
          aria-label="Close"
        >
          <IconCross fill="#111827" height="24" width="24" />
        </button>
        <div class="flex flex-col items-center">
          <IconTabSophie width="48" height="48" class="text-[#ED77FF] mb-5" />
          <p class="text-[#181D27] text-lg font-semibold text-center">
            {{ $t("roadmap_page.paywall_resources.heading") }}
          </p>
          <p class="text-[#535862] text-sm text-center mt-2">
            {{ $t("roadmap_page.paywall_resources.detail") }}
          </p>
        </div>
        <div class="flex gap-3">
          <NuxtLinkLocale
            :to="'/pricing'"
            class="border border-gray-200 py-2.5 w-full rounded-lg text-[#414651] font-semibold text-center"
          >
            {{ $t("schoolList_page.mentorship.free_mentorship") }}
          </NuxtLinkLocale>
          <NuxtLinkLocale
            :to="'/signup'"
            class="border border-[#1570EF] text-center bg-[#1570EF] py-2.5 w-full rounded-lg text-white font-semibold"
          >
            {{ $t("roadmap_page.paywall_resources.sign_up_for_free") }}
          </NuxtLinkLocale>
        </div>
      </div>
    </div>
  </Transition>
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

const resourcesSoftPaywall = ref<boolean>(false);

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

const isTokenLoaded = ref<boolean>(false);
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
    if (sophieStore.roadmapTaskDetail?.feature_state === "sophie") {
      getChatHistory();
    }
  }
);

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
