<template>
  <div
    class="absolute top-0 right-0 left-0 w-full flex justify-between items-center px-5 sm::px-8 mt-5 sm:mt-8"
  >
    <div class="w-32 sm:w-[172px]">
      <NuxtLinkLocale to="/" aria-label="Go to Starter Page">
        <IconArrowsterLogoFull class="w-full" />
      </NuxtLinkLocale>
    </div>
    <div
      v-if="isOnboarding && onboardingStore.onboardingProgress"
      class="w-[50%] bg-[#E9EAEB] h-2 rounded-full hidden md:block"
    >
      <div
        class="h-full bg-[#1570EF] rounded-full transition-all ease-in-out duration-700"
        :style="{ width: onboardingStore.onboardingProgress }"
      />
    </div>
    <!-- temprory width to set the view after commenting dropdown -->
    <!-- <div class="w-[150px]"> 
    </div> -->
    <BaseLanguageDropdown />
  </div>
</template>
<script setup lang="ts">
import useOnboardingStore from "~/stores/OnboardingStore";

const onboardingStore = useOnboardingStore();
const route = useRoute();

const isOnboarding = computed(() => {
  if (route.path.includes("/onboarding")) {
    return true;
  } else false;
});
</script>
