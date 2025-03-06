<template>
  <section class="flex flex-col gap-2 size-full overflow-hidden">
    <div class="flex-1 overflow-y-auto no-scrollbar">
      <div
        class="size-full flex flex-col items-center min-h-fit justify-center py-3 overflow-y-auto"
        v-if="completeChat.length === 0"
      >
        <NuxtImg
          src="/images/sophie-chat.png"
          alt="sophie"
          class="h-[242px] w-[252px]"
        />
        <span class="text-[#414651] text-xl font-medium mt-6">
          How can Sophie help you today?
        </span>
        <textarea
          placeholder="Message Sophie"
          rows="3"
          v-model="inputQuestion"
          @keydown.enter="handleKeydown"
          class="w-full px-3.5 py-2.5 border-[1.5px] border-gray-200 rounded-xl mt-6 focus:outline-none resize-none placeholder:font-light min-h-fit"
        />
        <div class="flex justify-center flex-wrap mt-3 gap-3">
          <div
            v-for="(question, idx) in preQuestion"
            :key="idx"
            @click="handelPreQuestion(question)"
            class="border-[1.5px] border-gray-200 py-2 px-3.5 rounded-lg text-[#414651] text-sm font-semibold cursor-pointer"
          >
            {{ question }}
          </div>
        </div>
      </div>
      <div v-else class="size-full overflow-hidden flex flex-col gap-4">
        <!-- chat -->
        <div
          ref="chatContainer"
          class="flex-1 overflow-y-auto no-scrollbar flex flex-col h-full"
        >
          <div
            v-for="(chat, index) in completeChat"
            :key="index"
            class="flex items-start gap-3 w-full"
            :class="{
              'justify-end': chat.isSender,
            }"
          >
            <div
              v-if="!chat.isSender"
              class="size-8 rounded-full bg-black overflow-hidden"
            >
              <NuxtImg
                src="/images/chat-bot.png"
                alt="chat bot"
                class="object-cover object-center size-full"
              />
            </div>
            <div
              class="mb-8 w-fit max-w-[90%] text-wrap text-[#414651]"
              :class="{
                'bg-[#FAFAFA] py-2 px-3 rounded-lg': chat.isSender,
              }"
            >
              <div>
                <vue-markdown :source="chat.text" :options="options" />
              </div>
            </div>
          </div>
          <div
            v-if="isChatLoading"
            class="w-fit text-[#A4A7AE] font-thin flex items-center gap-3"
          >
            <div class="size-8 rounded-full bg-black overflow-hidden">
              <NuxtImg
                src="/images/chat-bot.png"
                alt="chat bot"
                class="object-cover object-center size-full"
              />
            </div>
            <span> Sophie is checking your information... </span>
          </div>
        </div>
        <!-- input -->
        <div class="flex flex-col gap-4">
          <Transition name="fade">
            <div
              v-if="isChatFull"
              class="border-[1.5px] border-[#F5F5F5] bg-[#F5F5F5] py-3 px-3.5 rounded-lg flex items-center justify-between gap-3"
            >
              <div class="text-[#414651] text-sm">
                <p class="font-semibold mb-1.5">
                  You've reached your daily limit for Sophie interactions.
                </p>
                <p class="">
                  Please find instructions to upgrade for more access here.
                </p>
              </div>
              <button
                class="border-[1.5px] border-gray-200 bg-white rounded-lg py-2 px-3.5"
              >
                Upgrade now
              </button>
            </div>
          </Transition>
          <input
            v-if="!readOnly"
            type="text"
            placeholder="Message Sophie"
            v-model="inputQuestion"
            @keydown.enter="handleKeydown"
            :disabled="isChatLoading || isChatFull"
            class="border-[1.5px] border-gray-200 rounded-lg py-2.5 px-3.5 placeholder:font-thin w-full focus:outline-none"
            :class="{ '#FAFAFA': isChatFull }"
          />
        </div>
      </div>
    </div>
    <div>
      <p class="text-[#A4A7AE] text-xs text-center">
        <span v-if="!readOnly">
          Sophie can make mistakes. Please check important info.
        </span>
        <span v-else>
          You can review this chat, but replying or continuing the conversation
          is currently not available.
        </span>
      </p>
    </div>
  </section>
</template>
<script setup lang="ts">
import axios from "axios";
import type { ChatDetail, SophieChat } from "~/types/home";
import { v4 as uuidv4 } from "uuid";
import useDashboardStore from "~/stores/dashboardStore";

const { api } = useApi();
const { showToast } = useToast();
const dashboardStore = useDashboardStore();

const props = defineProps({
  isNewChat: {
    type: Boolean,
    default: false,
  },
  singleChatDetail: {
    type: Array as PropType<ChatDetail[]>,
    default: () => [],
  },
  isModal: {
    type: Boolean,
    default: false,
  },
  isSummarizeOverview: {
    type: Boolean,
    default: false,
  },
});

const chatContainer = ref<HTMLElement | null>(null);
const completeChat = ref<SophieChat[]>([]);
const inputQuestion = ref<string>("");
const isChatLoading = ref<boolean>(false);
const isChatFull = ref<boolean>(false);
const readOnly = ref<boolean>(false);
const uuid = ref<string>();

const preQuestion: string[] = [
  "Should I take the TOEFL or the IELTS?",
  "Which country will suit me most for study abroad?",
  "How can I craft a good Personal Statement?",
  "Which major should I choose?",
];

const options = {
  html: true,
};

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === "Enter") {
    event.preventDefault();
    submit();
  }
};
const handelPreQuestion = (question: string) => {
  inputQuestion.value = question;
  submit();
};

// Function to scroll to the bottom
const scrollDown = () => {
  nextTick(() => {
    if (chatContainer.value) {
      chatContainer.value.scrollTop =
        chatContainer.value.scrollHeight - chatContainer.value.clientHeight;
    }
  });
};

const submit = async () => {
  try {
    completeChat.value.push({
      isSender: true,
      text: inputQuestion.value,
    });
    scrollDown();
    isChatLoading.value = true;
    const userQuery = inputQuestion.value;
    inputQuestion.value = "";
    const response = await api.post(`/api/v1/ai-conversation/sophie`, {
      query: userQuery,
      sophieSessionId: uuid.value,
    });
    if (response) {
      if (response.data.data) {
        completeChat.value.push({
          isSender: false,
          text: response.data.data,
        });
      } else {
        completeChat.value.push({
          isSender: false,
          text: "type again",
        });
      }
    }
    scrollDown();
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.status === 423) {
        isChatFull.value = true;
        return;
      }
      const errorMessage = error.message;
      showToast(errorMessage, {
        type: "warning",
      });
    }
  } finally {
    isChatLoading.value = false;
  }
};

watch(
  () => props.isNewChat,
  () => {
    completeChat.value = [];
    uuid.value = uuidv4();
    readOnly.value = false;
  }
);

watch(
  () => props.singleChatDetail,
  () => {
    if (props.singleChatDetail) {
      let transformChat: SophieChat[] = props.singleChatDetail.map((item) => {
        if (item.me) {
          return {
            isSender: true,
            text: item.me,
          };
        } else {
          return {
            isSender: false,
            text: item.sophie,
          };
        }
      });
      completeChat.value = transformChat;
      readOnly.value = true;
    }
  }
);

onMounted(() => {
  uuid.value = uuidv4();
  if (props.isSummarizeOverview) {
    inputQuestion.value = `Please summarize my school list \n  ${dashboardStore.overViews?.join("\n")}`;
    submit();
  }
});
</script>
