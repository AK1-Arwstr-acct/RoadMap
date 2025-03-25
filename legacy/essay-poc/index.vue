<template>
  <div
    class="h-dvh w-screen py-12 bg-[#111113] text-white flex justify-center items-center"
  >
    <div class="flex flex-col h-full w-full sm:w-2/3 px-5">
      <div class="size-full rounded-lg bg-black/30 p-4 flex flex-col gap-5">
        <div
          ref="chatContainer"
          class="flex-1 overflow-y-auto no-scrollbar flex flex-col h-full"
        >
          <!-- chat messages -->
          <div
            v-if="essay"
            class="p-2 bg-gray-800/50 rounded-lg mb-2 w-fit max-w-[70%] text-wrap"
          >
            <div>
              <vue-markdown :source="essay" :options="options" />
            </div>
          </div>
          <div
            v-if="isChatLoading"
            class="p-2 bg-gray-800/50 rounded-lg mb-2 w-fit transform animate-pulse"
          >
            . . .
          </div>
          <!--  -->
        </div>
        <div class="flex justify-center">
          <button @click="onSubmit" class="border rounded-lg py-2.5 px-3 w-fit">
            Generate
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import axios from "axios";

const { api } = useApi();
const { showToast } = useToast();

const chatContainer = ref<HTMLElement | null>(null);
const essay = ref<string>("");
const isChatLoading = ref<boolean>(false);

const options = {
  html: true,
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

const onSubmit = async () => {
  try {
    scrollDown();
    isChatLoading.value = true;
    const response = await api.get(`/api/v1/ai-conversation/generate_an_essay`);
    isChatLoading.value = false;
    if (response) {
      essay.value = response.data.data;
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
