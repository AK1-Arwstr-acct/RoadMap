<template>
  <div class="h-dvh flex">
    <div class="w-[440px] h-full hidden lg:block">
      <OnboardingSidebar />
    </div>
    <div class="flex-1 h-full overflow-hidden px-4">
      <div ref="mainContent" class="overflow-y-auto no-scrollbar h-full">
        <div
          class="pt-10 max-w-[816px] mx-auto flex items-center justify-between"
        >
          <div>
            <button
              v-if="counselorStudentStore.onboardingStep > 1"
              @click="counselorStudentStore.onboardingStep--"
              class="size-10 min-w-10 rounded-lg border border-border-neutral flex justify-center items-center"
            >
              <IconChevronDown class="transform rotate-90" />
            </button>
          </div>
          <div>
            <button
              v-if="counselorStudentStore.onboardingStep < 4"
              @click="counselorStudentStore.onboardingStep++"
              class="size-10 min-w-10 rounded-lg border border-border-neutral flex justify-center items-center"
            >
              <IconChevronDown class="transform -rotate-90" />
            </button>
          </div>
        </div>
        <div class="w-full max-w-[405px] mx-auto pb-20 flex flex-col gap-14">
          <OnboardingSteps />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import useCounselorStudentStore from "~/stores/counselorStudentStore";

const counselorStudentStore = useCounselorStudentStore();

const mainContent = ref<HTMLElement | null>(null);

watch(
  () => counselorStudentStore.onboardingStep,
  () => {
    scrollToTop();
  }
);

const scrollToTop = () => {
  nextTick(() => {
    if (mainContent.value) {
      mainContent.value.scrollTo({
        top: 0,
      });
    }
  });
};
</script>
