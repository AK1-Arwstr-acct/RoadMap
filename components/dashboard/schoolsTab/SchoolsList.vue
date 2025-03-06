<template>
  <div class="grid grid-cols-10 gap-6 px-6 size-full">
    <div class="col-span-6 xl:col-span-7">
      <RecommendedSchools @getRecommendations="getRecommendations" />
    </div>
    <div class="col-span-4 xl:col-span-3">
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