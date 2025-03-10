<template>
  <div class="flex gap-10 xl:gap-14 px-6 size-full">
    <div class="flex-1 h-fit">
      <RecommendedSchools @getRecommendations="getRecommendations" />
    </div>
    <div class="w-[312px]">
      <UserDetails />
    </div>
  </div>
</template>
<script setup lang="ts">
import useDashboardStore from "~/stores/dashboardStore";
import useAppStore from "~/stores/AppStore";

const appStore = useAppStore();
const dashboardStore = useDashboardStore();

const getRecommendations = async (pageNo: number = 1) => {
  if (appStore.userData) {
    if (appStore.userData.educational_records.next_program_titles.length > 0) {
      await dashboardStore.runEngine(pageNo);
    } else {
      await dashboardStore.preRunEngine(pageNo);
    }
  }
};

watch(
  () => appStore.userData,
  async () => {
    getRecommendations();
  }
);

onMounted(() => {
  getRecommendations();
  if (
    !(
      dashboardStore.programListOptions.length &&
      dashboardStore.locationOptions.length &&
      dashboardStore.budgetList.length &&
      dashboardStore.coursePreferenceOptions.length
    )
  ) {
    dashboardStore.setProgramListOptions();
    dashboardStore.setLocationOptions();
    dashboardStore.setBudgetList();
    dashboardStore.setCoursePreferenceOptions();
  }
});
</script>