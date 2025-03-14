<template>
  <div class="size-full flex flex-col items-center">
    <div
      class="flex w-full justify-between items-center py-8 px-28 border-b border-[#E9EAEB]"
    >
      <div
        @click="navigateTo(localePath('/dashboard'))"
        class="flex gap-2 items-center cursor-pointer"
      >
        <NuxtImg
          src="/images/logo/logo.svg"
          alt="Logo"
          class="w-44 h-7"
          loading="eager"
          preload
        />
      </div>
      <button
        @click="submit"
        :disabled="isSubmitting"
        class="py-2.5 px-5 text-sm font-semibold text-white bg-[#1570EF] rounded-lg flex items-center gap-2 disabled:opacity-60"
      >
        Save to Profile
        <IconSpinner v-if="isSubmitting" class="size-3.5" bgColor="#ffffff00" />
      </button>
    </div>
    <div
      class="flex-1 w-full flex justify-center overflow-y-auto custom-scrollbar"
    >
      <div class="w-[50%] h-fit py-[42px]">
        <div>
          <h1 class="text-[#181D27] text-3xl font-medium mb-8">
            {{ essayStore.finalEssay?.title }}
          </h1>
          <div v-if="essayStore.finalEssay?.essayText" class="text-[#181D27]">
            <ClientOnly>
              <vue-markdown
                :source="essayStore.finalEssay?.essayText"
                :options="options"
                class="h-fit flex flex-col gap-4"
              />
            </ClientOnly>
          </div>
        </div>
        <div class="h-px bg-[#E9EAEB] my-[42px]" />
        <div class="flex justify-between gap-6 items-start">
          <div class="flex gap-3">
            <NuxtImg
              src="/images/chatbot.png"
              class="w-[74px] h-[70px] object-contain"
            />
            <div>
              <h3 class="text-[#181D27] font-medium">
                We've also sent this essay to your email.
              </h3>
              <p class="text-[#535862] text-sm mt-1.5">
                This is far from good though. Want to know how to customise it
                even more and make it 10x better?
              </p>
            </div>
          </div>
          <button
            @click="navigateTo(localePath('/pricing'))"
            class="text-[#414651] w-fit text-nowrap font-semibold text-sm py-2 px-3.5 border border-[#D5D7DA] rounded-lg shadow-[0px_1px_2px_0px_#0A0D120D]"
          >
            Make my essay 10x better
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import axios from "axios";
import useEssayStore from "~/stores/essayStore";

const essayStore = useEssayStore();
const { api } = useApi();
const { showToast } = useToast();
const localePath = useLocalePath();

const isSubmitting = ref<boolean>(false);

const options = {
  html: true,
};

const submit = async () => {
  try {
    isSubmitting.value = true;
    await api.post(
      "/api/v1/student/save-essay-to-profile",
      essayStore.essayPayload
    );
    showToast("Profile updated successfully", {
      type: "success",
    });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage = errorList(error);
      showToast(errorMessage, {
        type: "error",
      });
    }
  } finally {
    isSubmitting.value = false;
  }
};

onUnmounted(() => {
  essayStore.finalEssay = undefined;
});
</script>
