<template>
  <div
    class="py-5 px-4 bg-[#EEF4FF] border border-[#E0EAFF] rounded-lg space-y-5"
  >
    <div class="w-full h-2 rounded-full bg-[#D1E9FF]">
      <div
        class="bg-[#1570EF] rounded-full h-full transition-all ease-in-out duration-1000"
        :style="{ width: isActive ? '100%' : '80%' }"
      />
    </div>
    <div>
      <h4 class="text-sm font-semibold text-[#181D27]">
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
      <p class="text-sm text-[#535862] mt-2">
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
    <div class="">
      <NuxtImg src="/images/discover-journey.png" alt="Discover Journey" />
    </div>
    <button
      v-if="
        dashboardStore.enginePosition === 'final'
          ? false
          : (dashboardStore.totalSchool || 0) >= 6
      "
      :disabled="!isActive || dashboardStore.isFinalEnginCall"
      class="bg-[#1570EF] disabled:opacity-50 text-sm text-white w-full py-2.5 rounded-lg flex gap-2 justify-center items-center"
      @click="finalEngine"
    >
      <div class="size-4">
        <IconLock v-if="!isActive" />
        <IconTabSophie v-else class="size-full" width="20" height="20" />
      </div>
      <span class="text-sm pt-1.5">
        {{ !isActive ? "Unlock" : "Get" }} AI recommendation
      </span>
      <IconSpinner v-if="isSubmitting" class="size-4" bgColor="#ffffff00" />
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
