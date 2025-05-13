<template>
  <div class="h-full flex flex-col items-center">
    <div
      class="flex-1 w-full flex justify-center overflow-y-auto custom-scrollbar"
    >
      <div class="px-6 h-fit py-[12px] md:py-[42px]">
        <div>
          <div class="relative flex justify-between items-start gap-4 mb-8">
            <h1 class="text-[#181D27] text-3xl font-medium">
              {{ essayStore.finalEssay?.title }}
            </h1>
            <button
              @click="submit"
              :disabled="isSubmitting || isSubmitedBefore"
              class="py-2.5 px-5 text-xs sm:text-sm font-semibold text-white bg-[#1570EF] rounded-lg flex items-center gap-2 disabled:opacity-60"
            >
              {{ $t("ai_essay_page.save_to_profile") }}
              <IconSpinner
                v-if="isSubmitting"
                class="size-3.5"
                bgColor="#ffffff00"
              />
            </button>
          </div>
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
        <div class="h-px bg-[#E9EAEB] my-6 md:my-[42px]" />
        <div
          class="flex flex-col md:flex-row justify-between gap-6 items-end md:items-start"
        >
          <div class="flex gap-3">
            <img
              src="/images/chatbot.png"
              class="w-[64px] sm:w-[74px] h-[60px] sm:h-[70px] object-contain"
            />
            <div>
              <h2 class="text-[#181D27] font-medium text-sm sm:text-base">
                {{
                  $t("ai_essay_page.weve_also_sent_this_essay_to_your_email")
                }}
              </h2>
              <p class="text-[#535862] text-xs sm:text-sm mt-1.5">
                {{ $t("ai_essay_page.this_is_far_from_good_though") }}
              </p>
            </div>
          </div>
          <NuxtLinkLocale
            :to="'/pricing'"
            class="text-[#414651] w-full sm:w-fit text-nowrap font-semibold text-sm py-2 px-3.5 border border-[#D5D7DA] rounded-lg shadow-[0px_1px_2px_0px_#0A0D120D]"
          >
            {{ $t("ai_essay_page.make_my_essay_10x_better") }}
          </NuxtLinkLocale>
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
const deviceType = useDeviceType();

const isSubmitting = ref<boolean>(false);
const isSubmitedBefore = ref<boolean>(false);

const options = {
  html: true,
};

const submit = async () => {
  try {
    isSubmitting.value = true;
    if (isSubmitedBefore.value) {
      return;
    }
    await api.post(
      "/api/v1/student/save-essay-to-profile",
      essayStore.essayPayload
    );
    showToast("Profile updated successfully", {
      type: "success",
    });
    isSubmitedBefore.value = true;
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
