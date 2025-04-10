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
      <img
        src="/images/ai-recommendation.png"
        alt="Discover Journey"
        class="w-[164px]"
        loading="eager"
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
  <Transition name="fade">
    <div
      v-if="isPublicPaywall"
      class="fixed z-50 inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center px-5"
    >
      <div
        class="bg-white p-6 flex flex-col gap-8 rounded-xl w-full max-w-[400px]"
      >
        <div class="flex flex-col items-center">
          <IconTabSophie width="48" height="48" class="text-[#ED77FF] mb-5" />
          <p class="text-[#181D27] text-lg font-semibold text-center">
            Sign up to continue using AI recommendations!
          </p>
          <p class="text-[#535862] text-sm text-center mt-2">
            You've reached the limit for AI recommendations. Sign up now to
            continue exploring more personalized options!
          </p>
        </div>
        <div class="flex gap-3">
          <button
            @click="isPublicPaywall = false"
            class="border border-gray-200 py-2.5 w-full rounded-lg text-[#414651] font-semibold"
          >
            Cancel
          </button>
          <button
            @click="navigateTo(localePath('/signup'))"
            class="border border-[#1570EF] bg-[#1570EF] py-2.5 w-full rounded-lg text-white font-semibold"
          >
            Sign up for free
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>
<script setup lang="ts">
import useDashboardStore from "~/stores/dashboardStore";

defineProps({
  isActive: {
    type: Boolean,
    default: false,
  },
});

const localePath = useLocalePath();
const dashboardStore = useDashboardStore();

const isPublicPaywall = ref<boolean>(false);
const isSubmitting = ref<boolean>(false);

const finalEngine = async () => {
  if (dashboardStore.isSchoolListPublic) {
    isPublicPaywall.value = true;
    return;
  }
  isSubmitting.value = true;
  await dashboardStore.runFinalEngine();
  isSubmitting.value = false;
  dashboardStore.isFinalEnginCall = true;
};
</script>
