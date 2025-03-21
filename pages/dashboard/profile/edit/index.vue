<template>
  <section class="bg-[#FAFAFA] h-full overflow-y-auto no-scrollbar">
    <div class="max-w-[640px] px-4 mx-auto mt-8 mb-16">
      <h3 class="text-[#181D27] text-2xl font-semibold mb-8">Edit profile</h3>
      <div class="flex flex-col gap-8">
        <EditUserPersonalInfo />
        <UserAcademicProfile />
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
import useDashboardStore from "~/stores/dashboardStore";

definePageMeta({
  layout: "dashboard-layout",
});

const dashboardStore = useDashboardStore();

onMounted(() => {
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
