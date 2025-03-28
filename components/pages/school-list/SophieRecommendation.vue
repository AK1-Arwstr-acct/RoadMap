<template>
  <div
    class="py-5 px-4 bg-[#EEF4FF] border-[1.5px] border-[#E0EAFF] rounded-lg space-y-5"
  >
    <div class="w-full h-2 rounded-full bg-[#D1E9FF] hidden md:block">
      <div
        class="bg-[#1570EF] rounded-full h-full transition-all ease-in-out duration-1000"
        :style="{ width: isActive ? '100%' : '80%' }"
      />
    </div>
    <div>
      <h4 class="text-sm 2xl:text-lg font-semibold text-[#181D27]">
        <span
          v-if="
            dashboardStore.enginePosition === 'final'
              ? false
              : (dashboardStore.totalSchool || 0) >= 6
          "
        >
          Overwhelmed by options?
        </span>
        <span v-else> We've found your best match! </span>
      </h4>
      <p class="text-sm 2xl:text-base text-[#535862] mt-2">
        <span
          v-if="
            dashboardStore.enginePosition === 'final'
              ? false
              : (dashboardStore.totalSchool || 0) >= 6
          "
        >
          Select your major and our AI will match you with the ones that match
          100%
        </span>
        <span v-else>
          Based on your chosen major, this is the top school that fits your
          profile.
        </span>
      </p>
    </div>
    <div class="hidden md:flex justify-center">
      <NuxtImg
        src="/images/ai-recommendation.png"
        alt="Discover Journey"
        class="w-[164px]"
        loading="eager"
        preload
      />
    </div>
    <button
      v-if="
        dashboardStore.enginePosition === 'final'
          ? false
          : (dashboardStore.totalSchool || 0) >= 6
      "
      :disabled="!isActive || dashboardStore.isFinalEnginCall"
      class="bg-[#1570EF] disabled:opacity-50 text-sm text-white w-full py-2.5 rounded-lg flex gap-3 justify-center !disabled:cursor-pointer"
      @click="finalEngine"
    >
      <div class="flex gap-2 justify-center items-center">
        <IconLock v-if="!isActive" />
        <IconTabSophie v-else width="20" height="20" />
        <span class="text-sm block">
          {{ !isActive ? "Unlock" : "Get" }} AI recommendation
        </span>
        <IconSpinner v-if="isSubmitting" class="size-4" bgColor="#ffffff00" />
      </div>
    </button>
  </div>
</template>
<script setup lang="ts">
import useDashboardStore from "~/stores/dashboardStore";

defineProps({
  isActive: {
    type: Boolean,
    default: false,
  },
});

const isSubmitting = ref<boolean>(false);
const dashboardStore = useDashboardStore();

const finalEngine = async () => {
  isSubmitting.value = true;
  await dashboardStore.runFinalEngine();
  isSubmitting.value = false;
  dashboardStore.isFinalEnginCall = true;
};
</script>
