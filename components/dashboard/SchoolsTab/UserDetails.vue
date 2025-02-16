<template>
  <section
    class="pt-8 pb-6 h-full flex flex-col gap-6 overflow-y-auto no-scrollbar"
  >
    <UserDataInfo />
    <SophieRecommendation :isActive="isActive" />
    <WhyTheseSchool v-if="isActive" />
    <MajorSelection />
  </section>
</template>
<script setup lang="ts">
import useAppStore from '~/stores/AppStore';

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
