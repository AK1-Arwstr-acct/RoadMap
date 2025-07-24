<template>
  <div
    class="absolute z-10 top-0 right-0 left-0 w-full flex justify-between items-center gap-10 px-5 sm:px-8 md:px-24 py-6 md:py-8"
  >
    <div @click="emit('updateStep')" class="cursor-pointer">
      <IconChevronDown stroke="text-icon-neutral" class="transform rotate-90" />
    </div>
    <div class="flex-1 h-2 flex items-center gap-1.5">
      <div
        v-for="(step, idx) in 4"
        :key="idx"
        class="h-full flex-1 rounded-full transition-all ease-in-out duration-700"
        :class="[
          step <= onboardingStore.onboardingStep
            ? 'bg-progress-indicator-brand'
            : 'bg-progress-track-brand',
        ]"
      />
    </div>
    <div class="w-6">
      <!-- <IconCross fill="text-icon-neutral" width="24" height="24" /> -->
    </div>
  </div>
</template>
<script setup lang="ts">
import useOnboardingStore from "~/stores/OnboardingStore";

const onboardingStore = useOnboardingStore();

const emit = defineEmits(["updateStep"]);
</script>
