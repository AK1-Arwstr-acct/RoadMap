<template>
  <div class="size-full overflow-y-auto custom-scrollbar">
    <div class="h-full w-full max-w-[1150px] mx-auto">
      <div class="flex gap-10 xl:gap-14 px-6 w-full h-fit">
        <div class="flex-1">
          <RecommendedSchools
            v-if="!dashboardStore.isSchoolsLoading"
            @getRecommendations="getRecommendations"
          />
          <RecommendedSchoolSkeleton v-else />
        </div>
        <div class="w-[312px]">
          <UserDetails />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import useDashboardStore from "~/stores/dashboardStore";
import useAppStore from "~/stores/AppStore";

definePageMeta({
  layout: "dashboard-layout",
});

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
