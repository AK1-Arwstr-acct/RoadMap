<template>
  <div
    class="absolute z-10 top-0 right-0 left-0 w-full flex justify-between items-center px-5 sm::px-8 mt-5 sm:mt-8"
  >
    <div class="w-32 sm:w-[172px]">
      <NuxtLinkLocale to="/" aria-label="Go to Starter Page">
        <IconArrowsterLogoFull class="w-full" :class="{'lg:invert': ishome}" />
      </NuxtLinkLocale>
    </div>
    <BaseLanguageDropdown />
  </div>
</template>
<script setup lang="ts">
import useOnboardingStore from "~/stores/OnboardingStore";

defineProps({
  ishome: {
    type: true,
    default: false,
  },
});

const onboardingStore = useOnboardingStore();
const route = useRoute();

const isOnboarding = computed(() => {
  if (route.path.includes("/onboarding")) {
    return true;
  } else false;
});
</script>
