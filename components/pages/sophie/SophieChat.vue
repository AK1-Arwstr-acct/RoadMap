<template>
  <section class="flex flex-col gap-2 size-full overflow-hidden h-full">
    <div class="flex-1 overflow-y-auto no-scrollbar">
      <div
        class="md:size-full w-[calc(100%-8px)] max-w-[710px] mx-auto h-full flex flex-col items-center min-h-fit md:justify-center py-3 overflow-y-auto"
        v-if="completeChat.length === 0"
      >
        <div class="flex-1 flex flex-col items-center justify-center w-full">
          <img
            src="/images/sophie-chat.png"
            alt="sophie"
            class="w-[100px] md:h-[242px] md:w-[252px]"
            loading="eager"
          />
          <h1 class="text-[#414651] text-sm md:text-xl font-medium mt-6">
            How can Sophie help you today?
          </h1>
          <!-- deskop -->
          <div v-if="deviceType !== 'mobile'">
            <textarea
              placeholder="Message Sophie"
              rows="3"
              v-model="inputQuestion"
              @keydown.enter.exact.prevent="submit"
              @keydown.enter.ctrl.prevent="addNewLine"
              class="w-full px-3.5 py-2.5 border-[1.5px] border-gray-200 rounded-xl mt-6 focus:outline-none resize-none placeholder:font-light min-h-fit"
              data-hj-allow
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
        </div>
        <!-- mobile -->
        <div v-if="deviceType === 'mobile'" class="w-full">
          <div class="w-full overflow-hidden">
            <div class="flex overflow-x-auto mt-3 gap-3 w-full">
              <div
                v-for="(question, idx) in preQuestion"
                :key="idx"
                @click="handelPreQuestion(question)"
                class="bg-[#E8E8E880] py-2 px-3.5 rounded-lg text-[#414651] text-sm font-semibold cursor-pointer text-nowrap"
              >
                {{ question }}
              </div>
            </div>
          </div>
          <div class="relative mt-6">
            <input
              name="user_input_question"
              placeholder="Message Sophie"
              v-model="inputQuestion"
              class="w-full pl-3.5 pr-12 py-2.5 border-[1.5px] border-gray-200 rounded-xl focus:outline-none resize-none placeholder:font-light min-h-fit"
              data-hj-allow
            />
            <div
              @click="submit"
              v-if="inputQuestion.length > 0"
              class="cursor-pointer rounded-lg bg-[#1570EF] absolute top-1/2 transform -translate-y-1/2 right-2 -rotate-90 p-2.5"
            >
              <IconArrowRight />
            </div>
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
            v-for="(chat, index) in completeChat.filter(
              (item) => item.text !== ''
            )"
            :key="index"
            class="flex items-start gap-3 w-full max-w-[710px] mx-auto"
            :class="{
              'justify-end': chat.isSender,
            }"
          >
            <div
              v-if="!chat.isSender"
              class="size-8 min-w-8 rounded-full bg-black overflow-hidden"
            >
              <img
                src="/images/chat-bot.png"
                alt="chat bot"
                class="object-cover object-center size-full"
                loading="eager"
              />
            </div>
            <div
              class="mb-4 md:mb-8 w-fit max-w-[90%] text-wrap text-[#414651] suggestion-container"
              :class="{
                'bg-[#FAFAFA] py-1 px-2 md:px-3 rounded-lg': chat.isSender,
              }"
            >
              <div>
                <vue-markdown :source="chat.text" :options="options" />
              </div>
            </div>
          </div>
          <div
            v-if="isChatLoading"
            class="w-full text-[#A4A7AE] font-thin flex items-center gap-3 max-w-[710px] mx-auto"
          >
            <div class="size-8 min-w-8 rounded-full bg-black overflow-hidden">
              <img
                src="/images/chat-bot.png"
                alt="chat bot"
                class="object-cover object-center size-full"
                loading="eager"
              />
            </div>
            <span class="flex justify-center items-center">
              <div class="flex space-x-2">
                <div
                  class="size-3 bg-[#A4A7AE] rounded-full animate-pulse [animation-delay:0s] ease-in-out"
                ></div>
                <div
                  class="size-3 bg-[#A4A7AE] rounded-full animate-pulse [animation-delay:200ms] ease-in-out"
                ></div>
                <div
                  class="size-3 bg-[#A4A7AE] rounded-full animate-pulse [animation-delay:400ms] ease-in-out"
                ></div>
              </div>
            </span>
          </div>
        </div>
        <!-- input -->
        <div class="flex flex-col gap-4 w-full max-w-[710px] mx-auto">
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
              <NuxtLinkLocale to="/pricing">
                <button
                  class="border-[1.5px] border-gray-200 bg-white rounded-lg py-2 px-3.5"
                >
                  Upgrade now
                </button>
              </NuxtLinkLocale>
            </div>
          </Transition>
          <div
            class="relative border-[1.5px] border-gray-200 rounded-lg flex items-center"
            :class="{
              'bg-[#FAFAFA] pointer-events-none': isChatFull || isChatLoading,
            }"
          >
            <textarea
              v-if="!readOnly"
              ref="textarea"
              placeholder="Message Sophie"
              v-model="inputQuestion"
              @keydown.enter.exact.prevent="submit"
              @keydown.enter.ctrl.prevent="addNewLine"
              :disabled="isChatLoading || isChatFull"
              rows="1"
              autofocus
              class="placeholder:font-thin w-full focus:outline-none resize-none py-2.5 pl-3.5 pr-12 rounded-lg"
              data-hj-allow
            />
            <button
              :disabled="isChatLoading || isChatFull"
              @click="submit"
              class="cursor-pointer rounded-lg bg-[#1570EF] absolute top-1.5 transform right-2 -rotate-90 p-2"
            >
              <IconArrowRight />
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="completeChat.length !== 0" class="w-full max-w-[710px] mx-auto">
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
import useSophieStore from "~/stores/sophieStore";

const { api } = useApi();
const { showToast } = useToast();
const dashboardStore = useDashboardStore();
const sophieStore = useSophieStore();
const deviceType = useDeviceType();
const route = useRoute();

const emit = defineEmits(["isChatLoading"]);

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
  isTokenLoaded: {
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
const textarea = ref<HTMLTextAreaElement | null>(null);

const preQuestion: string[] = [
  "Should I take the TOEFL or the IELTS?",
  "Which country will suit me most for study abroad?",
  "How can I craft a good Personal Statement?",
  "What scholarships can I apply for?",
  "Which major should I choose?",
];

const options = {
  html: true,
};

const adjustHeight = () => {
  const el = textarea.value;
  if (el) {
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 100) + "px";
  }
};

const addNewLine = async () => {
  inputQuestion.value += "\n";
  await nextTick();
  adjustHeight();
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
    emit("isChatLoading", true);
    if (!route.query.query) {
      completeChat.value.push({
        isSender: true,
        text: !props.isSummarizeOverview
          ? inputQuestion.value
          : dashboardStore.overViews?.join("\n") || "",
      });
    }
    scrollDown();
    isChatLoading.value = true;
    const userQuery = inputQuestion.value;
    inputQuestion.value = "";
    await nextTick();
    adjustHeight();
    let response;
    if (sophieStore.isSophiePublic) {
      const publicToken = useCookie("publicToken");
      response = await api.post(
        `/api/v1/session-based-journey/ai-conversation/sophie`,
        {
          query: userQuery,
          sophieSessionId: uuid.value,
        },
        {
          headers: {
            "X-auth-token": publicToken.value,
          },
        }
      );
    } else {
      response = await api.post(`/api/v1/ai-conversation/sophie`, {
        query: userQuery,
        sophieSessionId: uuid.value,
      });
    }
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
    if (route.query.query) {
      router.replace({
        query: undefined,
      });
    }
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
    emit("isChatLoading", false);
    await nextTick();
    if (textarea.value) {
      textarea.value?.focus();
    }
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
            text: item.me.replace("Please summarize my school list \n  ", ""),
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

watch(
  () => props.isTokenLoaded,
  (newValue) => {
    if (newValue) {
      submit();
    }
  }
);

onMounted(async () => {
  uuid.value = uuidv4();
  if (props.isSummarizeOverview) {
    inputQuestion.value = `Please summarize my school list \n  ${dashboardStore.overViews?.join(
      "\n"
    )}`;
    submit();
  }
  if (route.query.query) {
    console.log(route.query.query);
    completeChat.value.push({
      isSender: true,
      text: `${route.query.query}`,
    });
    isChatLoading.value = true;
    const publicToken = useCookie("publicToken");
    if (publicToken.value) {
      submit();
    }
  }
});
</script>
