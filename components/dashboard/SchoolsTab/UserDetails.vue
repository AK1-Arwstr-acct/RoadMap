<template>
  <section
    class="pt-8 pb-6 h-full flex flex-col gap-6 overflow-y-auto no-scrollbar"
  >
    <UserDataInfo />
    <SophieRecommendation :isActive="isActive" />
    <WhyTheseSchool v-if="(dashboardStore.overViews?.length ?? 0) >= 1" />
    <MajorSelection />
  </section>
</template>
<script setup lang="ts">
import useAppStore from "~/stores/AppStore";
import useDashboardStore from "~/stores/dashboardStore";

const appStore = useAppStore();
const dashboardStore = useDashboardStore();

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
