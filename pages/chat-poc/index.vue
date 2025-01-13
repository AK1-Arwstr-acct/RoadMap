<template>
  <div
    class="h-[100dvh] w-screen py-12 bg-[#111113] text-white flex justify-center items-center"
  >
    <div class="h-full w-1/2 rounded-lg bg-black/30 p-4 flex flex-col gap-5">
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
          class="bg-transparent border border-white/50 w-full rounded-lg py-2 pl-2 pr-11 outline-none"
        />
        <div
          @click="onSubmit"
          class="absolute right-2 top-1/2 transform -translate-y-1/2 size-7 bg-white rounded-full flex justify-center items-center cursor-pointer"
        >
          <IconArrowRight fill="#000000" />
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

// Function to scroll to the bottom
const scrollDown = () => {
  nextTick(() => {
    if (chatContainer.value) {
      chatContainer.value.scrollTop =
        chatContainer.value.scrollHeight - chatContainer.value.clientHeight;
    }
  });
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
    const response = await api.post("/v1/ai-conversation/ask-question", {
      school_usernames: [
        "university_of_sunderland",
        "university_of_sussex",
        "university_of_plymouth",
        "faulkner_university",
      ],
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
</script>
