<template>
  <div
    class="h-[100dvh] w-screen py-12 bg-[#111113] text-white flex justify-center items-center"
  >
    <div class="flex flex-col h-full w-1/2">
      <div class="">
        <button
          @click="toggleApi"
          class="px-5 py-2.5 bg-gray-600/50 rounded-lg mb-3 font-medium"
        >
          Switch to
          {{ callApi === "ask-question" ? "Scholarship" : "Questions" }}
        </button>
      </div>
      <div class="size-full rounded-lg bg-black/30 p-4 flex flex-col gap-5">
        <div
          ref="chatContainer"
          class="flex-1 overflow-y-auto no-scrollbar flex flex-col h-full"
        >
          <!-- chat messages -->
          <div
            v-for="(chat, index) in completeChat"
            :key="index"
            class="p-2 bg-gray-800/50 rounded-lg mb-2 w-fit max-w-[70%] text-wrap"
            :class="{ 'self-end': chat.isSender }"
          >
            <p>
              {{ chat.text }}
            </p>
          </div>
          <div
            v-if="isChatLoading"
            class="p-2 bg-gray-800/50 rounded-lg mb-2 w-fit transform animate-pulse"
          >
            . . .
          </div>
          <!--  -->
        </div>
        <div class="relative">
          <input
            type="text"
            v-model="inputQuestion"
            placeholder="Ask Somthing . . ."
            @keydown.enter="onSubmit"
            :disabled="isChatLoading"
            class="bg-transparent border border-white/50 w-full rounded-lg py-2 pl-2 pr-11 outline-none disabled:cursor-wait"
          />
          <button
            @click="onSubmit"
            :disabled="isChatLoading"
            class="absolute right-2 top-1/2 transform -translate-y-1/2 size-7 disabled:cursor-wait bg-white rounded-full flex justify-center items-center cursor-pointer"
          >
            <IconArrowRight fill="#000000" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import axios from "axios";
import type { PocChat } from "~/types/home";

const { api } = useApi();
const { showToast } = useToast();

const chatContainer = ref<HTMLElement | null>(null);
const inputQuestion = ref<string>("");
const completeChat = ref<PocChat[]>([]);
const isChatLoading = ref<boolean>(false);
const callApi = ref<"ask-question" | "scholarship">("ask-question");

// Function to scroll to the bottom
const scrollDown = () => {
  nextTick(() => {
    if (chatContainer.value) {
      chatContainer.value.scrollTop =
        chatContainer.value.scrollHeight - chatContainer.value.clientHeight;
    }
  });
};

const toggleApi = () => {
  if (callApi.value === "ask-question") {
    callApi.value = "scholarship";
  } else {
    callApi.value = "ask-question";
  }
};

const onSubmit = async () => {
  try {
    completeChat.value.push({
      isSender: true,
      text: inputQuestion.value,
    });
    scrollDown();
    isChatLoading.value = true;
    const question = inputQuestion.value;
    inputQuestion.value = "";
    const response = await api.post(`/api/v1/ai-conversation/${callApi.value}`, {
      ...(callApi.value === "ask-question" && {
        school_usernames: [
          "university_of_sunderland",
          "university_of_sussex",
          "university_of_plymouth",
          "faulkner_university",
        ],
      }),
      query: question,
    });
    isChatLoading.value = false;
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
    isChatLoading.value = false;
    if (axios.isAxiosError(error)) {
      const errorMessage = error.message;
      showToast(errorMessage, {
        type: "warning",
      });
    }
  }
};

watch(
  () => callApi.value,
  () => {
    completeChat.value = [];
  }
);
</script>
