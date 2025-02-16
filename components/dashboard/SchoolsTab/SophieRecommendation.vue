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
      <h4 class="text-sm font-semibold text-[#181D27]">AI Recommendation</h4>
      <p class="text-sm text-[#535862] mt-2">
        Select your majors to unlock personalized AI recommendations
      </p>
    </div>
    <div class="">
      <img src="/public/images/discoverJourney.png" alt="Discover Journey" />
    </div>
    <button
      :disabled="!isActive"
      class="bg-[#1570EF] disabled:opacity-50 text-sm text-white w-full py-2.5 rounded-lg flex gap-2 justify-center items-center"
    >
      <div class="size-5">
        <IconLock v-if="!isActive" />
        <IconTabSophie v-else class="size-full" />
      </div>
      Unlock AI recommendation
    </button>
  </div>
</template>
<script setup lang="ts">
import useAppStore from "~/stores/AppStore";

const appStore = useAppStore();

const isActive = ref<boolean>(false);

watch(
  () => appStore.userData,
  async () => {
    if (appStore.userData) {
      if (
        appStore.userData.educational_records.next_program_titles.length > 0
      ) {
        isActive.value = true;
      } else {
        isActive.value = false;
      }
    }
  }
);
</script>
