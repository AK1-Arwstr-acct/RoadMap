<template>
  <div
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-6"
  >
    <div
      class="bg-white rounded-xl w-full max-w-[400px] p-4 md:p-6 flex flex-col gap-4 md:gap-6 shadow-xl relative"
    >
      <!-- Close Button -->
      <button
        @click="close"
        class="absolute top-3 md:top-[18px] right-3 md:right-[18px]"
        aria-label="Close"
      >
        <IconCross fill="#111827" height="24" width="24" />
      </button>
      <!-- Bunny Image -->
      <div class="flex flex-col items-center">
        <img
          src="/images/sophie-chat.png"
          alt="Need help?"
          class="w-[100px] h-[100px] md:w-[142px] md:h-[134px] mb-4 md:mb-6"
        />
        <div class="w-full">
          <p class="md:text-xl font-semibold text-[#111827]">
            {{ $t("mentorship_popup.title") }}
          </p>
          <p class="text-sm md:text-base text-[#525252] mt-1.5">
            {{ $t("mentorship_popup.line_1") }}
          </p>
        </div>
      </div>
      <!-- Features -->
      <div class="flex flex-col gap-3">
        <div class="flex items-center gap-3">
          <div
            class="bg-[#F5F5F5] rounded-full p-2 min-w-12 md:min-w-10 size-12 md:size-10 flex justify-center items-center"
          >
            <IconSchoolBuilding />
          </div>
          <span class="text-[#525252] text-sm md:text-base">{{
            $t("mentorship_popup.line_2")
          }}</span>
        </div>
        <div class="flex items-center gap-3">
          <div
            class="bg-[#F5F5F5] rounded-full p-2 min-w-12 md:min-w-10 size-12 md:size-10 flex justify-center items-center"
          >
            <IconNotes />
          </div>
          <span class="text-[#525252] text-sm md:text-base">{{
            $t("mentorship_popup.line_3")
          }}</span>
        </div>
      </div>
      <!-- Description -->
      <p class="text-[#525252] text-sm md:text-base">
        {{ $t("mentorship_popup.line_4") }}
      </p>
      <!-- Actions -->
      <div class="flex flex-col sm:flex-row gap-3">
        <button
          @click="close"
          class="flex-1 py-2 rounded-lg border border-[#E5E5E5] bg-[#E5E5E5] text-[#111827] font-semibold order-1 sm:order-none"
        >
          {{ $t("mentorship_popup.button_later") }}
        </button>
        <button
          @click="getMentorship"
          class="flex-1 py-2 rounded-lg bg-[#2563EB] text-[#FDFDFD] font-semibold text-center"
        >
          {{ $t("mentorship_popup.button_confirm") }}
        </button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import useAppStore from "~/stores/AppStore";

const appStore = useAppStore();
const route = useRoute();
const localePath = useLocalePath();

const emit = defineEmits(["close"]);

const getMentorship = () => {
  emit("close");
  navigateTo(localePath("/pricing"));
};

const close = () => {
  if (appStore.popupTimer !== 60000) {
    appStore.popupTimer = 60000;
  }
  emit("close");
};
</script>
